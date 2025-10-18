function ReportViewerModel({fileId, onClose}){


     const [file, setFile] = useState(null);
  const [insight, setInsight] = useState(null);
  useEffect(() => {
    async function load() {
      const { data: fileData } = await axios.get(`/api/files/${fileId}`, /* auth */);
      setFile(fileData);
      if (fileData.aiInsightId) {
        const { data: ai } = await axios.get(`/api/ai/insight/${fileData.aiInsightId}`);
        setInsight(ai);
      } else {
        // trigger processing if you allow
        const { data: ai } = await axios.post(`/api/ai/process/${fileId}`);
        setInsight(ai);
      }
    }
    load();
  }, [fileId]);
    return(
        <div>
        <div>
            ReportViewerModel
        </div>
        
        </div>
    )
}

export default ReportViewerModel