import axios from "axios";

const make_playlist = async (
  emojis,
  customization,
  setIsGenerating,
  setPlaylist,
  setShowPlaylist,
  displayError
) => {
  try {
    const resp = await axios.post("http://127.0.0.1:5000/api/get-playlist", {
      emojis,
      customization,
    });
    setIsGenerating(false);
    setPlaylist(resp.data);
    setShowPlaylist(true);
  } catch (error) {
    displayError(error.message);
    setIsGenerating(false);
    setPlaylist(null);
  }
};

export default make_playlist;
