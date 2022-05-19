import axios, { AxiosError } from "axios";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { urlResolver } from "../../../lib/UrlResolver";
import { FileInput } from "../../../types/utils/FileInput";
import { ResourceType } from "../../../types/utils/ResourceType";
import getRESTOptions from "../../../util/getRESTOptions";
import FormFieldLabel from "../FormFieldLabel/FormFieldLabel";
import FormHelperText from "../FormHelperText/FormHelperText";
import FileUploader from "./FileUploads";
import UploaderPlaceholder from "./UploaderPlaceholder";

const focusedStyle = {
  borderColor: "#2196f3",
};

const rejectStyle = {
  borderColor: "#ef4444",
};

export interface UploadedFile {
  id: number;
  name: string;
  url: string;
  type?: string;
  // key: string;
  // presignedUrl?: string;
}

interface Props {
  children: ReactNode;
  label: string;
  ariaLabel: string;
  labelFontColour?: string;
  labelClass: string;
  helperText: string;
  displayOptionalLabel: boolean;
  isError: boolean;
  acceptedFileTypes: string | string[];
  maxFiles: number;
  maxSize: number;
  // customerId: string;
  fileUploads: UploadedFile[];
  setFileUploads: (files: UploadedFile[]) => void;
  inputClass?: string;
  resourceType: ResourceType;
}

const DropzoneField = ({
  children,
  label,
  ariaLabel,
  labelFontColour,
  labelClass,
  helperText,
  isError,
  displayOptionalLabel,
  acceptedFileTypes,
  maxFiles,
  maxSize,
  // customerId,
  fileUploads,
  inputClass,
  setFileUploads,
  resourceType,
}: Props) => {
  const isMultiple = maxFiles !== 1;
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: acceptedFileTypes,
    maxFiles: maxFiles,
    multiple: isMultiple,
    maxSize: maxSize,
  });

  // error handling
  const inputError =
    isDragReject || fileRejections.length > 0
      ? "Oops, There was an error with your upload"
      : "";

  const [uploadError, setUploadError] = useState("");

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(!!inputError || !!uploadError ? rejectStyle : {}),
    }),
    [isFocused, inputError, uploadError]
  );

  // const alert = useAlerts();

  // upload files
  const [isLoading, setIsLoading] = useState(false);

  const handleS3Upload = useCallback(
    async (resourceType) => {
      const uploadedFiles: UploadedFile[] = [];
      acceptedFiles.forEach(async (file, index) => {
        if (index === 0) {
          setIsLoading(true);
          setUploadError("");
        }

        try {
          // fetch presigned url
          const input: FileInput = {
            resourceType,
            name: file.name,
            fileType: file.type,
          };
          const options = getRESTOptions(file.type);
          const response = await axios.post(urlResolver.signS3(), input);

          const { id, sign, url } = response.data;
          // upload file to s3
          axios.put(sign, file, options);

          // keep track of all uploaded files
          uploadedFiles.push({
            id,
            url,
            name: file.name,
            type: file.type,
          });
        } catch (error) {
          const newError = (error as AxiosError)?.response?.data?.[0];

          setUploadError(
            newError ?? `There was an error with your ${file.name} upload`
          );
        }

        // store uploaded files
        if (index === acceptedFiles.length - 1) {
          // single => replace
          // multiple => append
          if (isMultiple) {
            setFileUploads([...fileUploads, ...uploadedFiles]);
          } else {
            setFileUploads(uploadedFiles);
          }

          setIsLoading(false);
        }
      });
    },
    [acceptedFiles]
  );

  useEffect(() => {
    handleS3Upload(resourceType);
  }, [handleS3Upload]);

  // remove files
  const onRemoval = useCallback(
    (fileName: string) => {
      setFileUploads(fileUploads.filter((file) => file.name !== fileName));
    },
    [fileUploads]
  );

  return (
    <div>
      {/* label */}
      {label ? (
        <FormFieldLabel
          label={label}
          fontColour={labelFontColour}
          displayOptionalLabel={displayOptionalLabel}
          extraClass={labelClass}
        />
      ) : null}

      {/* uploader */}
      <div
        {...getRootProps({
          style,
          "aria-label": `${label || ariaLabel}-div`,
          className: inputClass,
        })}
      >
        <input
          {...getInputProps({
            "aria-label": `${label || ariaLabel}-label`,
          })}
        />
        {/* can drag and drop here */}
        {fileUploads.length ? (
          <FileUploader
            files={fileUploads}
            isMultiple={isMultiple}
            onRemoval={onRemoval}
          />
        ) : (
          <UploaderPlaceholder />
        )}
      </div>
      <FormHelperText
        isError={isError || !!inputError || !!uploadError}
        helperText={uploadError || inputError || helperText}
        spacing="mt-2 mb-3"
      />

      {isLoading ? (
        <p className="mt-2.5 font-nunito font-thin text-11px text-grey-420">
          Loading...
        </p>
      ) : null}
    </div>
  );
};

DropzoneField.defaultProps = {
  label: "",
  ariaLabel: "",
  labelClass: "mb-2",
  helperText: "",
  displayOptionalLabel: false,
  isError: false,
  acceptedFileTypes: "",
  maxFiles: 0, // 0 means no limit
  maxSize: 1000 * 1000 * 25, //TODO 25 mb okay?
  customerId: "",
};

export default DropzoneField;
