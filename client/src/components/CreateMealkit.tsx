import {
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  Image,
  AspectRatio,
  Img,
} from "@chakra-ui/react";
import { InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/input";
import { Form } from "formik";
import React, { useState } from "react";
import { MealkitInput, useCreateMealkitMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import Dropzone from "react-dropzone";
import SvgUploadMealkitIcon from "./svgComponents/UploadMealkitIcon";
import { HeadingLayout } from "./HeadingLayout";

interface CreateMealkitProps {
  input: {
    name: string;
    price: string;
    portion: string;
    images: string[];
    items: string[];
  };
  setInput: Function;
  nextStep: Function;
  prevStep: Function;
  handleOnDropMealkitFiles: Function;
  mealkitFilesPreview: any;
  mealkitFilesPreviewHandler: Function;
}

export const CreateMealkit: React.FC<CreateMealkitProps> = ({
  input,
  setInput,
  prevStep,
  handleOnDropMealkitFiles,
  mealkitFilesPreview,
  mealkitFilesPreviewHandler,
}) => {
  return (
    <Box>
      {mealkitFilesPreview.length === 0 ? (
        // if not file preview
        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles) =>
            handleOnDropMealkitFiles(acceptedFiles, rejectedFiles)
          }
          multiple={true}
          accept={["image/*", "video/*"]}
        >
          {({ getRootProps, getInputProps }) => (
            <Box>
              <Box
                {...getRootProps({
                  onChange: (event) => {
                    mealkitFilesPreviewHandler(event);
                  },
                })}
              >
                <input {...getInputProps()} />

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
              </Box>
            </Box>
          )}
        </Dropzone>
      ) : (
        <Flex overflowX="scroll">
          {/* if there is file preview */}{" "}
          {mealkitFilesPreview.map((filePreview: any, index: number) => (
            <Box key={index} mx={2}>
              {filePreview.slice(0, 10).includes("video") ? (
                <video controls width="50%">
                  <source src={filePreview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={filePreview}
                  alt="meal kit image"
                  height="200px"
                  // vh="80%"
                  borderRadius={10}
                />
              )}
            </Box>
          ))}
        </Flex>
      )}

      <Form>
        {/* <Heading>Create a mealkit</Heading> */}

        <InputField
          name="name"
          value={input.name}
          placeholder="name of the mealkit"
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <InputGroup>
          <InputLeftAddon children="Price" mt={2} />
          <InputField
            name="price"
            type="number"
            value={input.price}
            placeholder="price"
            variant="flushed"
            onChange={(e) => setInput({ ...input, price: e.target.value })}
          />
          <InputRightAddon children="THB" mt={2} />
        </InputGroup>

        {/* <Heading fontSize="md" whiteSpace="nowrap">
          Portion for
        </Heading> */}
        <Flex alignItems="center">
          <InputGroup>
            <InputLeftAddon children="Portion for" mt={2} />
            {/* <InputLeftAddon children="ปริมาณสำหรับ" mt={2} /> */}
            <InputField
              name="portion"
              type="number"
              value={input.portion}
              placeholder="portion"
              variant="flushed"
              onChange={(e) => setInput({ ...input, portion: e.target.value })}
            ></InputField>

            <InputRightAddon children="people" mt={2} />
          </InputGroup>
        </Flex>
        <InputField
          name="items"
          type="text"
          value={input.items}
          placeholder="items"
          onChange={(e) => setInput({ ...input, items: e.target.value })}
        ></InputField>
      </Form>

      <Flex justifyContent="space-between">
        <IconButton
          aria-label="Search database"
          icon={<ChevronLeftIcon />}
          onClick={() => prevStep()}
          fontSize="x-large"
          color="dark.200"
          variant="none"
        />
      </Flex>
    </Box>
  );
};
