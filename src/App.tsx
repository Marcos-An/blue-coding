import { Input } from "./components/atoms/Input";
import styles from "./index.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "./components/molecules/Modal";

function App() {
  const [GIFS, setGIFS] = useState([]);
  const [searchInput, setSearchInput] = useState("happy");
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${searchInput.replaceAll(
          " ",
          "+"
        )}&api_key=pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa&limit=${limit}`
      )
      .then(({ data }) => setGIFS(data.data));
  }, [searchInput, limit]);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSelected = (gif: any) => {
    setSelected(gif);
    handleOpenModal();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <Input
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        />

        <div className={styles.contentWrapper}>
          {GIFS.map((gif: any) => (
            <img
              key={gif.id}
              src={gif.images.downsized.url}
              className={styles.image}
              onClick={() => handleSelected(gif)}
            />
          ))}
        </div>
      </div>
      <Modal
        GIFS={GIFS}
        gif={selected}
        handleOpenModal={handleOpenModal}
        setSelected={setSelected}
        isOpen={isOpenModal}
      />
    </div>
  );
}

export default App;
