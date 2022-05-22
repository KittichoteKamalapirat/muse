import { ArrowUpIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/input";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Image,
  Img,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import { Form } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { urlResolver } from "../lib/UrlResolver";
import { FileInput } from "../types/utils/FileInput";
import { FileMetadata } from "../types/utils/FileMetadata";
import { ResourceType } from "../types/utils/ResourceType";
import getRESTOptions from "../util/getRESTOptions";
import { InputField } from "./InputField";
import SvgUploadMealkitIcon from "./svgComponents/UploadMealkitIcon";

interface CreateMealkitProps {
  ingredientsField: {
    ingredient: string;
    amount: string;
    unit: string;
  }[];
  input: {
    name: string;
    price: string;
    mealkitPortion: string;
    images: string[];
    items: string[];
  };
  setInput: Function;
  prevStep: Function;
  mealkitS3UrlAndIds: FileMetadata[];
  setMealkitS3UrlAndIds: React.Dispatch<React.SetStateAction<FileMetadata[]>>;
}

export const CreateMealkit: React.FC<CreateMealkitProps> = ({
  ingredientsField,
  input,
  setInput,
  prevStep,
  mealkitS3UrlAndIds,
  setMealkitS3UrlAndIds,
}) => {
  const [mealkitFiles, setMealkitFiles] = useState<any>([]);

  const handleOnDropMealkitFiles = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setMealkitFiles(acceptedFiles);
  };

  // I need an array of files and and signedRequest

  useEffect(() => {
    if (mealkitFiles.length > 0) {
      const fileMetadatas: FileMetadata[] = [];

      mealkitFiles.forEach((file: any, index: number) => {
        // sign
        const input: FileInput = {
          name: file.name,
          fileType: file.type,
          resourceType: ResourceType.MEALKIT,
        };

        axios.post(urlResolver.signS3(), input).then((response) => {
          const options = getRESTOptions(file.type);

          // save to s3
          axios.put(response.data.sign, file, options);

          fileMetadatas.push({
            url: response.data.url,
            id: response.data.id,
            fileType: file.type,
          });

          // if last loop, can't use index because it's async (2->4->3->1 could happen)
          if (fileMetadatas.length === mealkitFiles.length) {
            setMealkitS3UrlAndIds(fileMetadatas);
          }
        });
      });
    }
  }, [mealkitFiles, setMealkitS3UrlAndIds]);

  return (
    <Box mt={4}>
      <Wrap spacing="2%" justify="center">
        {mealkitS3UrlAndIds.map((s3UrlAndId, index) => (
          <WrapItem key={index} m={1} width="48%">
            {s3UrlAndId.fileType!.includes("video") ? (
              <video controls>
                <source src={s3UrlAndId.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Img src={s3UrlAndId.url} alt="meal kit" borderRadius="10%" />
            )}
          </WrapItem>
        ))}
      </Wrap>

      <Dropzone
        onDrop={(acceptedFiles, rejectedFiles) =>
          handleOnDropMealkitFiles(acceptedFiles, rejectedFiles)
        }
        multiple={true}
        accept={["image/*", "video/*"]}
      >
        {({ getRootProps, getInputProps }) => (
          <Box>
            <Box {...getRootProps({})}>
              <input {...getInputProps()} />

              {mealkitS3UrlAndIds.length === 0 ? (
                <Flex
                  direction="column"
                  alignItems="center"
                  border="1px"
                  borderColor="gray.200"
                  bgColor="gray.50"
                >
                  <ArrowUpIcon mt="3rem" />

                  <SvgUploadMealkitIcon width="10rem" height="10rem" />
                  <Text textAlign="center" mb="2rem">
                    Drag and drop a video here, or click to select the file
                  </Text>
                </Flex>
              ) : (
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  borderColor="gray.400"
                  border="1px"
                  borderStyle="dashed"
                  my={4}
                >
                  <PlusSquareIcon mr={2} />

                  <Text textAlign="center">Replce files</Text>
                </Flex>
              )}
            </Box>
          </Box>
        )}
      </Dropzone>

      <Form>
        <Box mt={4}>
          <Heading fontSize="md">Meal Kit Name</Heading>
          <InputField
            name="name"
            value={input.name}
            placeholder="name of the mealkit"
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
        </Box>

        <Box mt={4}>
          <Heading fontSize="md">Price</Heading>

          <InputGroup>
            <InputField
              name="price"
              type="number"
              value={input.price}
              placeholder="price"
              onChange={(e) => setInput({ ...input, price: e.target.value })}
            />
            <InputRightAddon>THB</InputRightAddon>
          </InputGroup>
        </Box>

        <Box mt={4}>
          <Heading fontSize="md">Portion For</Heading>

          <InputGroup>
            <InputField
              name="mealkitPortion"
              type="number"
              value={input.mealkitPortion}
              placeholder="portion"
              onChange={(e) =>
                setInput({ ...input, mealkitPortion: e.target.value })
              }
            />

            <InputRightAddon>people</InputRightAddon>
          </InputGroup>
        </Box>

        {/* checkbox */}
        <Box my={4}>
          <Heading fontSize="lg">Items include</Heading>
          <Text fontSize="xs" color="alert">
            * At least 1 ingredient
          </Text>
          {ingredientsField.filter(
            (ingredientObj) => ingredientObj.ingredient !== ""
          ).length === 0 ? (
            <div>
              You have not added any ingredients. Please add them in the
              previous page.
            </div>
          ) : (
            <CheckboxGroup
              colorScheme="green"
              // defaultValue={ingredientsField.map(
              //   (ingredientWithUnit) => ingredientWithUnit.ingredient
              // )}
            >
              {ingredientsField &&
                ingredientsField
                  .filter((ingredientObj) => ingredientObj.ingredient !== "")
                  .map((ingredientWitUnit, index) => (
                    <Stack key={index}>
                      <Checkbox
                        colorScheme="green"
                        value={ingredientWitUnit.ingredient}
                        onChange={(e) => {
                          const index = input.items.indexOf(e.target.value);

                          if (index === -1) {
                            //not in the array yet
                            if (input.items.length === 0) {
                              setInput({
                                ...input,
                                items: [e.target.value],
                              });
                            } else {
                              setInput({
                                ...input,
                                items: input.items.concat(e.target.value),
                              });
                            }
                          } else {
                            setInput({
                              ...input,
                              items: input.items.filter((_, i) => index !== i),
                            });
                          }
                        }}
                      >
                        {ingredientWitUnit.ingredient}
                      </Checkbox>
                    </Stack>
                  ))}
            </CheckboxGroup>
          )}
        </Box>
      </Form>
    </Box>
  );
};
