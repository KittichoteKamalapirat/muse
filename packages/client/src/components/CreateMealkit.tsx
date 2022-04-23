import { ArrowUpIcon, ChevronLeftIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/input";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Form } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import UrlResolver from "../lib/UrlResolver";
import { FileMetadata } from "../types/utils/FileMetadata";
import { FileUrlAndID } from "../types/utils/FileUrlAndID";
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
    portion: string;
    images: string[];
    items: string[];
  };
  setInput: Function;
  nextStep: Function;
  prevStep: Function;
  mealkitS3UrlAndIds: FileUrlAndID[];
  setMealkitS3UrlAndIds: React.Dispatch<React.SetStateAction<FileUrlAndID[]>>;
}

const urlResolver = new UrlResolver();

export const CreateMealkit: React.FC<CreateMealkitProps> = ({
  ingredientsField,
  input,
  setInput,
  prevStep,
  mealkitS3UrlAndIds,
  setMealkitS3UrlAndIds,
}) => {
  const [mealkitFiles, setMealkitFiles] = useState<any>([]);

  console.log({ mealkitFiles });
  console.log({ mealkitS3UrlAndIds });

  const handleOnDropMealkitFiles = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setMealkitFiles(acceptedFiles);
  };

  // I need an array of files and and signedRequest

  useEffect(() => {
    if (mealkitFiles.length > 0) {
      console.log("1");
      const urlAndIds: FileUrlAndID[] = [];

      mealkitFiles.forEach((file: any, index: number) => {
        console.log("2");
        // sign
        const input: FileMetadata = {
          name: file.name,
          fileType: file.type,
          resourceType: ResourceType.MEALKIT,
        };

        axios.post(urlResolver.signS3(), input).then((response) => {
          console.log("3");
          console.log({ response });
          const options = getRESTOptions(file.type);

          // save to s3
          axios.put(response.data.sign, file, options);
          console.log("4");
          urlAndIds.push({ url: response.data.url, id: response.data.id });
          console.log("5");
          if (index === mealkitFiles.length - 1) {
            setMealkitS3UrlAndIds(urlAndIds);
          }
        });
      });
    }
  }, [mealkitFiles.length]);

  return (
    <Box>
      {mealkitS3UrlAndIds.length === 0 ? null : (
        <Flex overflowX="scroll">
          {/* if there is file preview */}{" "}
          {mealkitS3UrlAndIds.map((s3UrlAndId, index: number) => (
            <Box key={index} mx={2}>
              {s3UrlAndId.url.slice(0, 10).includes("video") ? (
                <video controls width="50%">
                  <source src={s3UrlAndId.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={s3UrlAndId.url}
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
        {/* <Heading>Create a mealkit</Heading> */}

        <InputField
          name="name"
          value={input.name}
          placeholder="name of the mealkit"
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <InputGroup>
          <InputLeftAddon mt={2}>Price</InputLeftAddon>
          <InputField
            name="price"
            type="number"
            value={input.price}
            placeholder="price"
            variant="flushed"
            onChange={(e) => setInput({ ...input, price: e.target.value })}
          />
          <InputRightAddon mt={2}>THB</InputRightAddon>
        </InputGroup>

        {/* <Heading fontSize="md" whiteSpace="nowrap">
          Portion for
        </Heading> */}
        <Flex alignItems="center">
          <InputGroup>
            <InputLeftAddon mt={2}>Portion for</InputLeftAddon>
            {/* <InputLeftAddon children="ปริมาณสำหรับ" mt={2} /> */}
            <InputField
              name="portion"
              type="number"
              value={input.portion}
              placeholder="portion"
              variant="flushed"
              onChange={(e) => setInput({ ...input, portion: e.target.value })}
            ></InputField>

            <InputRightAddon mt={2}>people</InputRightAddon>
          </InputGroup>
        </Flex>
        {/* <InputField
          name="items"
          type="text"
          value={input.items}
          placeholder="items"
          onChange={(e) => setInput({ ...input, items: e.target.value })}
        ></InputField> */}
        <Text>items included</Text>

        {/* checkbox */}
        <Box my={4}>
          {" "}
          <Heading fontSize="lg">Items include</Heading>
          {ingredientsField.length === 0 ||
            (ingredientsField.length === 1 &&
            ingredientsField[0].ingredient === "" ? (
              <div>You have not added any ingredients</div>
            ) : (
              <CheckboxGroup
                colorScheme="green"
                // defaultValue={ingredientsField.map(
                //   (ingredientWithUnit) => ingredientWithUnit.ingredient
                // )}
              >
                {ingredientsField &&
                  ingredientsField.map((ingredientWitUnit, index) => (
                    <Stack key={index}>
                      {" "}
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
            ))}
        </Box>
      </Form>

      <Flex justifyContent="space-between">
        <IconButton
          aria-label="Search database"
          icon={<ChevronLeftIcon />}
          onClick={() => prevStep()}
          fontSize="x-large"
          color="dark.200"
          variant="transparent"
        />
      </Flex>
    </Box>
  );
};
