import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db, collection, addDoc, serverTimestamp, onSnapshot, query, where, orderBy, handleFirestoreError, OperationType, signInWithGoogle } from '../firebase';

interface UploadedImage {
  id: string;
  imageUrl: string;
  fileName: string;
  createdAt: any;
}

export default function ImageUpload() {
  const { user } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [existingUploads, setExistingUploads] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      setExistingUploads([]);
      return;
    }

    const q = query(
      collection(db, 'uploads'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const uploads: UploadedImage[] = [];
      snapshot.forEach((doc) => {
        uploads.push({ id: doc.id, ...doc.data() } as UploadedImage);
      });
      setExistingUploads(uploads);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'uploads');
    });

    return unsubscribe;
  }, [user]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const saveImages = async () => {
    if (!user) {
      setError("Please login to save images.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      for (const fileObj of files) {
        // In a real app, we would upload to Firebase Storage first.
        // For this demo, we'll use the local preview URL as the "image URL"
        // and store the metadata in Firestore.
        // NOTE: This preview URL will break on refresh, but it demonstrates the Firestore flow.
        
        await addDoc(collection(db, 'uploads'), {
          userId: user.uid,
          imageUrl: fileObj.preview,
          fileName: fileObj.file.name,
          createdAt: serverTimestamp()
        });
      }
      setFiles([]);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'uploads');
      setError("Failed to save images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Upload Product Images</h2>
          <p className="text-gray-600">Add high-quality images to showcase your products to the world.</p>
        </div>

        {!user ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-[#0066cc]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
            <p className="text-gray-500 mb-8">You need to be logged in to upload and save images to your account.</p>
            <button 
              onClick={signInWithGoogle}
              className="bg-[#0066cc] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0052a3] transition-all"
            >
              Login with Google
            </button>
          </div>
        ) : (
          <>
            <div 
              className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${
                dragActive ? "border-[#0066cc] bg-[#0066cc]/5" : "border-gray-200 bg-white"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#0066cc]/10 rounded-full flex items-center justify-center mb-6">
                  <Upload className="text-[#0066cc]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Drag & drop images here
                </h3>
                <p className="text-gray-500 mb-6">
                  Support for JPG, PNG, WEBP. Max file size 5MB.
                </p>
                <button 
                  onClick={() => inputRef.current?.click()}
                  className="bg-[#0066cc] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0052a3] transition-all shadow-lg shadow-[#0066cc]/20"
                >
                  Browse Files
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Local Preview Grid */}
            {files.length > 0 && (
              <div className="mt-10">
                <h4 className="font-bold text-gray-900 mb-4">New Uploads ({files.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {files.map((file, index) => (
                      <motion.div
                        key={file.preview}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 shadow-sm"
                      >
                        <img 
                          src={file.preview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            onClick={() => removeFile(index)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={saveImages}
                    disabled={isUploading}
                    className="bg-gray-900 text-white px-12 py-4 rounded-full font-bold hover:bg-black transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <CheckCircle2 size={20} />
                    )}
                    {isUploading ? "Saving..." : "Save to My Account"}
                  </button>
                </div>
              </div>
            )}

            {/* Existing Uploads Grid */}
            {existingUploads.length > 0 && (
              <div className="mt-16">
                <h4 className="font-bold text-gray-900 mb-4">Your Saved Images ({existingUploads.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {existingUploads.map((upload) => (
                    <div
                      key={upload.id}
                      className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white"
                    >
                      <img 
                        src={upload.imageUrl} 
                        alt={upload.fileName} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <p className="text-[10px] text-white truncate">{upload.fileName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
