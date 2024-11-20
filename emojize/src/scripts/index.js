import axios from "axios";

const make_playlist = async (
  emojis,
  setIsGenerating,
  setPlaylist,
  setShowPlaylist
) => {
  const resp = await axios.post("http://127.0.0.1:5000/api/get-playlist", {
    emojis,
  });
  setIsGenerating(false);
  setPlaylist(resp.data);
  setShowPlaylist(true);
};




export default make_playlist;
