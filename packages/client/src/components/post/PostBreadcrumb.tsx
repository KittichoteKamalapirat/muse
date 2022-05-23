import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FileMetadata } from "../../types/utils/FileMetadata";

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  videoS3UrlAndID: FileMetadata | null;
}

const PostBreadcrumb = ({ step, setStep, videoS3UrlAndID }: Props) => {
  const toast = useToast();
  console.log(videoS3UrlAndID);

  const navigate = (step: number) => {
    if (!videoS3UrlAndID) {
      return toast({
        title: "Please upload a video first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    return setStep(step);
  };
  return (
    <Breadcrumb separator=">" mt={12} textAlign="center" fontSize="sm">
      <BreadcrumbItem>
        <BreadcrumbLink
          fontWeight={step === 1 ? "bold" : ""}
          onClick={() => navigate(1)}
        >
          Video
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          fontWeight={step === 2 ? "bold" : ""}
          onClick={() => navigate(2)}
        >
          Thumbnail
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage={true}>
        <BreadcrumbLink
          fontWeight={step === 3 ? "bold" : ""}
          onClick={() => navigate(3)}
        >
          Post Details
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink
          fontWeight={step === 4 ? "bold" : ""}
          onClick={() => navigate(4)}
        >
          Meal Kit
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
export default PostBreadcrumb;
