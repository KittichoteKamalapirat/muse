// import { Box } from "@chakra-ui/layout";
// import React from "react";
// import Dropzone from "react-dropzone";

// interface PostVideoUploaderProps {
//   render: any;
// }

// class PostVideoUploader extends React.Component<PostVideoUploaderProps> {
//   render() {
//     const { file, preview, handleOnDrop, handlePreview } = this.props.render;
//     return (
//       <Dropzone
//         onDrop={handleOnDrop}
//         // maxSize={1000 * 1}
//         multiple={false}
//         // accept="video/mp4"
//       >
//         {({ getRootProps, getInputProps }) => (
//           <Box mt={2}>
//             <Box mb={2}>Video</Box>
//             <Box
//               cursor="pointer"
//               border="1px"
//               borderColor="gray.200"
//               padding={4}
//             >
//               <div {...getRootProps()}>
//                 <input
//                   onChange={(e) => handlePreview(e)}
//                   {...getInputProps()}
//                 />
//                 {!preview ? null : (
//                   <video controls>
//                     <source src={preview} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//                 <p>Drag and drop a video here, or click to select the fileds</p>
//               </div>
//             </Box>
//           </Box>
//         )}
//       </Dropzone>
//     );
//   }
// }

// export default PostVideoUploader;
export {};
