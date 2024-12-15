const FilePreview = ({ file, onRemove }) => (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
          <Upload className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
  
  // AddNewProject Component
  const AddNewProject = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
      projectName: '',
      clientName: '',
      cost: '',
      paymentMode: '',
      description: ''
    });
  
    const handleFileChange = (e) => {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    };
  
    const removeFile = (index) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...droppedFiles]);
    };
  
    return (
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Project</h1>
            <p className="text-gray-600">Add project details and upload relevant files</p>
          </div>
  
          {/* Main Content */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            {/* File Upload Section */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="mb-8 border-2 border-dashed border-gray-200 rounded-xl p-8 
                       text-center hover:border-gray-300 transition-colors relative"
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Support for multiple files
              </p>
            </div>
  
            {/* File Previews */}
            {files.length > 0 && (
              <div className="mb-8 space-y-2">
                {files.map((file, index) => (
                  <FilePreview
                    key={index}
                    file={file}
                    onRemove={() => removeFile(index)}
                  />
                ))}
              </div>
            )}
  
            {/* Project Details Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={e => setFormData({...formData, projectName: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
                           focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={e => setFormData({...formData, clientName: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
                           focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
              </div>
  
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Cost
                  </label>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={e => setFormData({...formData, cost: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
                           focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Mode of Payment
                  </label>
                  <select
                    value={formData.paymentMode}
                    onChange={e => setFormData({...formData, paymentMode: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
                           focus:ring-1 focus:ring-black transition-colors"
                  >
                    <option value="">Select payment mode</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
                         focus:ring-1 focus:ring-black transition-colors resize-none"
                />
              </div>
  
              <div className="flex justify-end space-x-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 
                         hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 
                         transition-colors"
                >
                  Create Project
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  // Page Layout Component
  
    
