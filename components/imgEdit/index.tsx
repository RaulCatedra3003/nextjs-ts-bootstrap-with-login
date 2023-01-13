import Image from "next/image";

export interface ImgEditProps {
  handleImage: () => void;
  handleImageChange (e: React.ChangeEvent<HTMLInputElement>): void;
  urlPreview: string;
  refId: string;
  defaultImg: string;
  rounded: boolean;
}

export default function ImgEdit ({
  handleImage,
  handleImageChange,
  urlPreview,
  refId,
  defaultImg,
  rounded,
}: ImgEditProps) {
  return (
    <div className="img-edit">
      <button
        className="img-edit-button"
        type="button"
        onClick={handleImage}
      >
        <span
          className={
            urlPreview ? 'bx bx-x icon_edit' : 'bx bxs-pencil icon_edit'
          }
        />
      </button>
      <Image
        src={urlPreview || defaultImg}
        className={
          rounded
            ? 'round-bordered-img'
            : 'bordered-img'
        }
        width={300}
        height={300}
        alt="profile"
      />
      <input
        type="file"
        name={refId}
        id={refId}
        className="hidden"
        onChange={handleImageChange}
        multiple={false}
      />
    </div>
  )
}