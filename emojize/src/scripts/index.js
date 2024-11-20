import axios from "axios";

const make_playlist = async (
  emojis,
  setIsGenerating,
  setPlaylist,
  setShowPlaylist
) => {
  const resp = await axios.post(
    "https://emojize-backend.onrender.com/api/get-playlist",
    {
      emojis,
    }
  );
  setIsGenerating(false);
  setPlaylist(resp.data);
  setShowPlaylist(true);
};

export default make_playlist;
