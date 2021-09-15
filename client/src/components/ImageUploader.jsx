import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  width: "200px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: "100%",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function ImageUploader({ getBase64 = () => {} }) {
  const [img, setImg] = useState("");
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      // Convert the file to Base64 format
      const base64 = await convertToBase64(file);
      getBase64(base64);
      setImg(base64);
    },
    [getBase64]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {img ? (
          <img
            alt=""
            width="150px"
            height="150px"
            style={{ borderRadius: "100%", objectFit:"cover" }}
            src={img}
          />
        ) : (
          <p>Drop your QUT ID Card</p>
        )}
      </div>
    </div>
  );
}

function convertToBase64(file) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject("Error: ", error);
  });
}

export function getBase64Data(base64) {
  const commaIndex = base64.indexOf(",");
  return base64.slice(commaIndex + 1);
}
