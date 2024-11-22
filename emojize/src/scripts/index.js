import axios from "axios";

const make_playlist = async (
  emojis,
  customization,
  setIsGenerating,
  setPlaylist,
  setShowPlaylist
) => {
  const resp = await axios.post(
    "https://emojize-backend.onrender.com/api/get-playlist",
    {
      emojis,
      customization,
    }
  );
  setIsGenerating(false);
  setPlaylist(resp.data);
  setShowPlaylist(true);
};

export default make_playlist;
