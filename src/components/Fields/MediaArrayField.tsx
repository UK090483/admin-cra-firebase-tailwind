import Button from "components/Buttons/Button";
import * as React from "react";
import ImageGallery from "react-image-gallery";

interface IMediaArrayFieldProps {
  label: string;
  mediaArray: any;
}

const MediaArrayField: React.FunctionComponent<IMediaArrayFieldProps> = (
  props
) => {
  const { label, mediaArray } = props;

  if (!Array.isArray(mediaArray)) {
    return <div>Input needs to be Array</div>;
  }

  return (
    <div className="bg-gray-300 p-4 rounded-md mb-2">
      <h4 className="font-bold text-lg pb-3">{label}</h4>

      {/* <div className="flex flex-wrap"> */}
      {mediaArray.map((item, index) => {
        if (item.type === "pdf") {
          return <PDFViewer key={index} src={item} />;
        }
        return <img key={index} src={item.src} alt="" className="h-20 mr-8" />;
      })}
      {/* </div> */}

      {/* <p>{text}</p> */}
    </div>
  );
};

export default MediaArrayField;

interface PDFViewerProps {
  src: any;
}
const PDFViewer: React.FC<PDFViewerProps> = ({ src }) => {
  return (
    <div className="w-full">
      <Button>Download AS PDF</Button>
      <div className="w-full flex justify-center">
        <ImageGallery
          additionalClass="w-full"
          items={[
            ...src.pdfAsImages.map((i: string) => ({
              original: i,
              thumbnail: i,
            })),
          ]}
        />
      </div>
    </div>
  );
};
