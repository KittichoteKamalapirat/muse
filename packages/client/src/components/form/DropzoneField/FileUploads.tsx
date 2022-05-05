import { IconButton } from "@chakra-ui/react";
import React from "react";
import { UploadedFile } from ".";
import TrashIcon from "../../atoms/icons/TrashIcon";

const baseStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5px",
  marginBottom: "5px",
  padding: "5px",
  borderWidth: "0.5px",
  borderRadius: 5,
  borderColor: "#3dc795",
  borderStyle: "dashed",
  borderOpacity: 0.7,
  outline: "none",

  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

interface Props {
  files: UploadedFile[];
  isMultiple: boolean;
  onRemoval: (fileKey: string) => void;
}

const FileUploads = ({ files, isMultiple, onRemoval }: Props) => (
  <>
    {/* {isMultiple ? (
      <p className="font-nunito text-xs text-grey-250 text-opacity-70">
        Uploads
      </p>
    ) : null} */}

    {files.map((file) => (
      <div
        key={file.name}
        className="w-1/2 max-w-2xl grid grid-cols-12 items-center mt-2.5"
      >
        <img src={file.url} alt="meal kit" />

        <div style={baseStyle}>Update</div>
        <div className="col-span-3 lg:col-span-2 xl:col-span-1 2xl:hidden" />
        <div className="flex flex-nowrap"></div>
      </div>
    ))}
  </>
);

FileUploads.defaultProps = {
  isMultiple: false,
};

export default FileUploads;
