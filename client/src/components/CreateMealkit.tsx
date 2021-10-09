import {
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Form } from "formik";
import React, { useState } from "react";
import { MealkitInput, useCreateMealkitMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import Dropzone from "react-dropzone";

interface CreateMealkitProps {
  input: MealkitInput;
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
      {mealkitFilesPreview.length === 0 ? null : (
        <Text>
          {" "}
          {mealkitFilesPreview.map((filePreview: any, index: number) => (
            <Box key={index}>
              <video controls width="50%">
                <source src={filePreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          ))}
        </Text>
      )}
      <Form>
        <Heading>Create a meal kit</Heading>
        <InputField
          name="price"
          type="number"
          value={input.price}
          placeholder="price"
          onChange={(e) => setInput({ ...input, price: e.target.value })}
        ></InputField>

        <InputField
          name="portion"
          type="number"
          value={input.portion}
          placeholder="portion"
          onChange={(e) => setInput({ ...input, portion: e.target.value })}
        ></InputField>

        <InputField
          name="items"
          type="text"
          value={input.items}
          placeholder="items"
          onChange={(e) => setInput({ ...input, items: e.target.value })}
        ></InputField>

        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles) =>
            handleOnDropMealkitFiles(acceptedFiles, rejectedFiles)
          }
          multiple={true}
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
                  <Text textAlign="center" mb="2rem">
                    Drag and drop a video here, or click to select the file
                  </Text>
                </Flex>
              </Box>
            </Box>
          )}
        </Dropzone>
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
