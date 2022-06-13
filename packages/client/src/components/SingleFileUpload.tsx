import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Image, Img, Text } from "@chakra-ui/react";
import axios from "axios";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useSignSingleFileS3Mutation } from "../generated/graphql";
import formatFilename from "./formatFilename";

interface SingleFileUploadProps {
  params?: string;
  currentUrl?: string;
  updateAvatar?: any;
  uploadSlip?: any;
  manuallyConfirmPayment?: any;
  isPaid?: boolean | undefined;
  paymentId?: string | string[] | undefined;
  // isPaidLoading: boolean;
}

// const [x] = useManuallyConfirmPaymentLazyQuery();

interface UploadedFileType {
  path: string;
  name: string;
  size: number;
  type: string;
}

export const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
  params,
  currentUrl,
  updateAvatar,
  uploadSlip,
  manuallyConfirmPayment,
  isPaid,
  paymentId,
  // isPaidLoading,
}) => {
  // useState

  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    currentUrl as string
  );
  const [autofileUrl] = useState<string>("");
  const [autoThumbnailBlob] = useState<any>(null);
  const [thumbnailFile, setThumbnailFile] = useState<{
    file: UploadedFileType;
  }>({
    file: { path: "", name: "", size: 0, type: "" },
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  // Apollo Hooks

  // const [signS3] = useSignS3Mutation();
  const [signSingleFileS3] = useSignSingleFileS3Mutation();

  //local functions

  const handleOnDropThumbnail = (acceptedFiles: any, rejectedFiles: any) => {
    console.log({ acceptedFiles });
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setThumbnailFile({ file: acceptedFiles[0] });

    if (uploadSlip) {
      manuallyConfirmPayment({
        variables: {
          paymentId: parseInt(paymentId as string),
        },
      });
    }
  };

  const uploadToS3 = async (
    thumbnailFile: UploadedFileType,
    signedRequest: string
  ) => {
    const thumbnailOptions = {
      headers: {
        "Content-Type": thumbnailFile.type,
      },
    };

    await axios.put(
      signedRequest,
      thumbnailFile || autoThumbnailBlob,
      thumbnailOptions
    );
  };

  const thumbnailPreviewHandler = (e: React.FormEvent<HTMLDivElement>) => {
    const reader = new FileReader();
    if (reader.error) {
      console.log(reader.error.message);
    }
    reader.onload = () => {
      if (reader.readyState === 2) {
        setThumbnailPreview(reader.result as string);
      }
    };

    reader.readAsDataURL((e.target as HTMLInputElement).files![0]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // S3 Video and images starts
      const response = await signSingleFileS3({
        variables: {
          filename: formatFilename(thumbnailFile.file.name),
          filetype: thumbnailFile.file.type,
        },
      });
      if (response.data?.signSingleFileS3) {
        const fileUrl = response.data.signSingleFileS3.fileUrl;
        const signedRequest = response.data.signSingleFileS3.signedRequest;

        await uploadToS3(thumbnailFile.file, signedRequest);

        //have to check what operation it is
        if (uploadSlip && manuallyConfirmPayment) {
          try {
            await uploadSlip({
              variables: {
                paymentId: parseInt(params as string),
                // paymentId: 1,
                slipUrl: fileUrl,
              },
            });

            if (isPaid) {
              router.push("/payment-status?status=success");
            } else {
              router.push("/payment-status?status=fail");
            }
          } catch (error) {
            console.log(error);
          }

          // confirmpayment
        }

        if (updateAvatar) {
          await updateAvatar({
            variables: {
              newAvatar: fileUrl,
            },
            // update: (cache: ApolloCache<UpdateAvatarMutation>, { data }) => {
            //   console.log(data);
            //   cache.writeFragment({
            //     id: "Me",
            //     fragment: gql`
            //       fragment _ on Me {
            //         avatar
            //       }
            //     `,
            //     data: { avatar: data.updateAvatar },
            //   });
            // },
          });

          router.push("/account");
        }

        setSubmitting(false);
        return;
      } else {
        return new Error("cannot upload");
      }
      // S3 end
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    setThumbnailPreview(currentUrl as string);
  }, [currentUrl]);

  return (
    <Box>
      {!thumbnailPreview ? (
        <Flex justifyContent="center">
          <Img src={autofileUrl} />
        </Flex>
      ) : (
        <Flex justifyContent="center">
          <Image src={thumbnailPreview} alt="image" fallbackSrc="/oops.png" />
        </Flex>
      )}

      <Dropzone
        onDrop={(acceptedFiles: any, rejectedFiles: any) =>
          handleOnDropThumbnail(acceptedFiles, rejectedFiles)
        }
        // maxSize={1000 * 3}
        multiple={true}
        accept="image/*"
      >
        {({ getRootProps, getInputProps }) => (
          <Box mt={2}>
            <Box cursor="pointer" padding={4}>
              <Box
                {...getRootProps({
                  onChange: (e: React.FormEvent<HTMLDivElement>) =>
                    thumbnailPreviewHandler(e),
                })}
              >
                <input {...getInputProps()} />

                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  border={!thumbnailPreview ? "1px" : undefined}
                  borderColor="gray.400"
                  borderStyle="dashed"
                >
                  {!thumbnailPreview ? (
                    <PlusSquareIcon mr={2} />
                  ) : (
                    <Image
                      border="1px"
                      borderColor="black"
                      mr={2}
                      borderRadius="20%"
                      src={thumbnailPreview}
                      alt="image"
                      boxSize="2rem"
                      fallbackSrc="/oops.png"
                    />
                  )}
                  {updateAvatar && (
                    <Text textAlign="center">Update a new avatar</Text>
                  )}
                  {uploadSlip && <Text textAlign="center">Upload a slip</Text>}
                </Flex>
              </Box>
            </Box>
          </Box>
        )}
      </Dropzone>
      <Box>
        {thumbnailFile.file.name.length > 0 && (
          <Button
            onClick={handleSubmit}
            width="100%"
            type="submit"
            isLoading={submitting}
          >
            {updateAvatar && <Text textAlign="center">Update</Text>}
            {uploadSlip && <Text textAlign="center">Upload</Text>}
          </Button>
        )}
      </Box>
    </Box>
  );
};

// export default withApollo({ ssr: false })(SingleFileUpload);
