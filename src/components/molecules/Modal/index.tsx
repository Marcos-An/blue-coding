import styles from "./modal.module.scss";

interface props {
  GIFS: any;
  gif: any;
  handleOpenModal: () => void;
  setSelected: Function;
  isOpen: boolean;
}

export const Modal = ({
  gif,
  GIFS,
  handleOpenModal,
  setSelected,
  isOpen,
}: props) => {
  const isLast = () => {
    const gifs = [...GIFS];
    const last = gifs.slice(-1)[0];

    if (last.id === gif.id) {
      return true;
    }

    return false;
  };

  const isFirst = () => {
    const gifs = [...GIFS];
    const first = gifs.slice(0, 1)[0];

    if (first.id === gif.id) {
      return true;
    }

    return false;
  };

  const newItem = (type: "prev" | "next") => {
    const gifs = [...GIFS];

    const index =
      type === "prev"
        ? gifs.findIndex((item) => item.id === gif.id) - 1
        : gifs.findIndex((item) => item.id === gif.id) + 1;

    return gifs[index];
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={isOpen ? styles.modalContainer : styles.modalClosed}>
      <div className={styles.contentContainer}>
        <span onClick={handleOpenModal} className={styles.closeButton}>
          X
        </span>

        <div className={styles.contentWrapper}>
          {!isFirst() && (
            <span
              onClick={() => {
                const newGif = newItem("prev");
                setSelected(newGif);
              }}
            >{`<`}</span>
          )}
          <img src={gif.images.downsized.url} />
          {!isLast() && (
            <span
              onClick={() => {
                const newGif = newItem("next");
                setSelected(newGif);
              }}
            >{`>`}</span>
          )}
        </div>
      </div>
    </div>
  );
};
