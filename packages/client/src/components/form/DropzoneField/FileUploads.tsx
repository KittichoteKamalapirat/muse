import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { UploadedFile } from ".";
import IconButton from "../../atoms/IconButton/IconButton";

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

const FileUploads = ({
  files,
  // isMultiple,
  onRemoval,
}: Props) => (
  <>
    {/* {isMultiple ? (
      <p className="font-nunito text-xs text-grey-250 text-opacity-70">
        Uploads
      </p>
    ) : null} */}

    {files.map((file) => (
      <div
        key={file.name}
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "50%",
            top: "-20px",
            right: "-10px",
            padding: "4px",
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IconButton
            icon={<DeleteIcon color="red.500" w={6} h={6} />}
            onClick={() => onRemoval(file.name)}
            label={`${file.name}-remove`}
          />
        </div>

        {file.type?.includes("video") ? (
          <video controls>
            <source src={file.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={file.url} alt="meal kit" />
        )}

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
