import { IMediaItemImage, IMediaItemPdf } from "applications/ApplicationTypes";
import { useField } from "formik";
import { Plus, XOutline } from "heroicons-react";
import React from "react";
import Dropzone from "react-dropzone";
import "react-dropzone-uploader/dist/styles.css";
import ImageGallery from "react-image-gallery";
import { useFirebase } from "react-redux-firebase";
import { Spinner } from "../../Spinner/Spinner";
const filesPath = "uploadedFiles";

interface DropZoneFile extends File {
  [k: string]: any;
}

interface MediaUploadProps {
  label: string;
  name: string;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ name, label }) => {
  const [uploading, setUploading] = React.useState(false);
  const [prepareUpload, setPrepareUpload] = React.useState(false);

  const formik = useField(name);

  const [fieldInput, meta, helper] = formik;

  const { error, value } = meta;
  const { setValue } = helper;

  const firebase = useFirebase();

  function onFilesDrop(file: (File | Blob)[]) {
    setUploading(true);
    firebase.uploadFiles(filesPath, file, filesPath).then((e) => {
      setValue([
        ...value, // @ts-ignore
        ...e.map((item) => ({ type: "image", src: item.downloadURL })),
      ]);
      setUploading(false);
    });
  }
  function onFileDelete(file: DropZoneFile, key: string) {
    return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  }

  return (
    <div>
      <span className="text-gray-700 ">
        {label}
        {error && <span className="text-xs text-red-500 pl-9">{error}</span>}
      </span>
      {value && (
        <div>
          <div className="grid grid-cols-3 gap-4 my-9 ">
            {value.map(
              (media: IMediaItemImage | IMediaItemPdf, index: string) => (
                <MediaItem key={index} item={media} />
              )
            )}

            <div className="mr-3  bg-actionColor-300  flex items-center justify-center">
              <Dropzone onDrop={onFilesDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <div className="flex items-center justify-center">
                        {uploading ? (
                          <Spinner size="1/2" color="white" />
                        ) : (
                          <Plus size={60} className="text-white" />
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;

interface MediaItemProps {
  item: IMediaItemImage | IMediaItemPdf;
}

const MediaItem: React.FC<MediaItemProps> = ({ item }) => {
  const [hover, setHover] = React.useState(false);
  const [eraseOverlay, setEraseOverlay] = React.useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className="relative"
    >
      {hover && (
        <XOutline
          onClick={() => {}}
          size={45}
          className="absolute -right-3 -top-3 bg-actionColor-500 rounded-full text-white shadow-2xl  z-50"
        />
      )}
      {item.type === "image" ? (
        <img src={item.src} />
      ) : (
        <ImageGallery
          additionalClass="w-full"
          items={[
            ...item.pdfAsImages.map((i: string) => ({
              original: i,
              thumbnail: i,
            })),
          ]}
        />
      )}
    </div>
  );
};
