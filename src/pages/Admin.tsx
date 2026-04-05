import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { db, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc, handleFirestoreError, OperationType, ref, uploadBytes, getDownloadURL, storage, serverTimestamp } from '../firebase';
import { Product } from '../types';
import { Plus, Edit2, Trash2, X, Check, Loader2, AlertCircle, ShieldCheck, Upload, Image as ImageIcon, FileText, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { ADMIN_EMAIL } from '../constants';

import ImageUpload from '../components/ImageUpload';

type Tab = 'products' | 'pages' | 'media';

export default function Admin() {
  const { user } = useAuth();
  const { formatPrice, t } = useSettings();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [productFilter, setProductFilter] = useState<'all' | 'shop' | 'design' | 'both'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [pageContents, setPageContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Product Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    oldPrice: 0,
    image: '',
    rating: 5,
    reviews: 0,
    isNew: false,
    isBestSeller: false,
    isTopRated: false,
    featured: false,
    targetPage: 'shop' as 'shop' | 'design' | 'both'
  });

  // Page Form State
  const [pageFormData, setPageFormData] = useState({
    pageId: '',
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    content: ''
  });

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items: Product[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(items);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'products');
      setLoading(false);
    });

    const unsubPages = onSnapshot(collection(db, 'page_content'), (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setPageContents(items);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'page_content');
    });

    return () => {
      unsubProducts();
      unsubPages();
    };
  }, []);

  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-8">Only administrators can access this page. Please log in with an admin account.</p>
          <a href="/" className="inline-block bg-[#0066cc] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0052a3] transition-all">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const handleOpenModal = (product: Product | null = null, defaultPage?: 'shop' | 'design' | 'both') => {
    setImageFile(null);
    setImagePreview(null);
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice || 0,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        isNew: !!product.isNew,
        isBestSeller: !!product.isBestSeller,
        isTopRated: !!product.isTopRated,
        featured: !!product.featured,
        targetPage: product.targetPage || 'shop'
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: 0,
        oldPrice: 0,
        image: '',
        rating: 5,
        reviews: 0,
        isNew: true,
        isBestSeller: false,
        isTopRated: false,
        featured: false,
        targetPage: defaultPage || 'shop'
      });
    }
    setIsModalOpen(true);
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic validation
      if (file.size > 5 * 1024 * 1024) {
        setError("File size too large. Please select an image under 5MB.");
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError("Invalid file type. Please select an image file.");
        return;
      }

      console.log("File selected:", file.name, file.size, file.type);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      let finalImageUrl = formData.image;

      // Upload image if a new file is selected
      if (imageFile) {
        setIsUploading(true);
        try {
          const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
          const snapshot = await uploadBytes(storageRef, imageFile);
          finalImageUrl = await getDownloadURL(snapshot.ref);
          console.log("Image uploaded successfully:", finalImageUrl);
        } catch (uploadErr: any) {
          console.error("Upload Error:", uploadErr);
          throw new Error(`Image upload failed: ${uploadErr.message || "Check storage permissions."}`);
        } finally {
          setIsUploading(false);
        }
      }

      if (!finalImageUrl) {
        throw new Error("Product image is required.");
      }

      const productData = {
        ...formData,
        image: finalImageUrl,
        updatedAt: serverTimestamp()
      };

      console.log("Saving product data:", productData);

      if (editingProduct) {
        console.log("Updating product:", editingProduct.id);
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
      } else {
        console.log("Adding new product");
        await addDoc(collection(db, 'products'), productData);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save Error:", err);
      handleFirestoreError(err, editingProduct ? OperationType.UPDATE : OperationType.CREATE, 'products');
      setError(`Failed to save product: ${err.message || "Check permissions."}`);
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'products');
    }
  };

  const handleOpenPageModal = (page: any | null = null) => {
    setImageFile(null);
    setImagePreview(null);
    if (page && page.id) {
      setEditingPage(page);
      setPageFormData({
        pageId: page.pageId,
        heroTitle: page.heroTitle || '',
        heroSubtitle: page.heroSubtitle || '',
        heroImage: page.heroImage || '',
        content: page.content || ''
      });
    } else {
      setEditingPage(null);
      setPageFormData({
        pageId: page?.pageId || '',
        heroTitle: '',
        heroSubtitle: '',
        heroImage: '',
        content: ''
      });
    }
    setIsPageModalOpen(true);
    setError(null);
  };

  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      let finalImageUrl = pageFormData.heroImage;

      // Upload image if a new file is selected
      if (imageFile) {
        setIsUploading(true);
        try {
          const storageRef = ref(storage, `pages/${Date.now()}_${imageFile.name}`);
          const snapshot = await uploadBytes(storageRef, imageFile);
          finalImageUrl = await getDownloadURL(snapshot.ref);
          console.log("Page image uploaded successfully:", finalImageUrl);
        } catch (uploadErr: any) {
          console.error("Page Upload Error:", uploadErr);
          throw new Error(`Image upload failed: ${uploadErr.message || "Check storage permissions."}`);
        } finally {
          setIsUploading(false);
        }
      }

      const pageData = {
        ...pageFormData,
        heroImage: finalImageUrl,
        updatedAt: serverTimestamp()
      };

      console.log("Saving page data for:", pageFormData.pageId, pageData);

      if (!pageFormData.pageId) {
        throw new Error("Page ID is missing. Cannot save.");
      }

      // Use pageId as the document ID to ensure uniqueness and prevent overwriting other pages
      await setDoc(doc(db, 'page_content', pageFormData.pageId), pageData);
      
      setIsPageModalOpen(false);
    } catch (err: any) {
      console.error("Page Save Error:", err);
      handleFirestoreError(err, (editingPage && editingPage.id) ? OperationType.UPDATE : OperationType.CREATE, 'page_content');
      setError(`Failed to save page content: ${err.message || "Check permissions."}`);
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#0066cc] mb-2">
              <ShieldCheck size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Admin Dashboard</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900">
              {activeTab === 'products' ? 'Manage Products' : 'Manage Pages'}
            </h1>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <button 
              onClick={() => setActiveTab('products')}
              className={cn(
                "px-4 sm:px-6 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2",
                activeTab === 'products' ? "bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/20" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <ShoppingBag size={18} />
              <span className="hidden xs:inline">Products</span>
            </button>
            <button 
              onClick={() => setActiveTab('pages')}
              className={cn(
                "px-4 sm:px-6 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2",
                activeTab === 'pages' ? "bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/20" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <FileText size={18} />
              <span className="hidden xs:inline">Pages</span>
            </button>
            <button 
              onClick={() => setActiveTab('media')}
              className={cn(
                "px-4 sm:px-6 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2",
                activeTab === 'media' ? "bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/20" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <Upload size={18} />
              <span className="hidden xs:inline">Media</span>
            </button>
          </div>

          {activeTab === 'products' && (
            <button 
              onClick={() => handleOpenModal()}
              className="bg-[#0066cc] text-white px-6 py-3 rounded-full font-bold hover:bg-[#0052a3] transition-all flex items-center gap-2 shadow-lg shadow-[#0066cc]/20"
            >
              <Plus size={20} />
              Add New Product
            </button>
          )}
        </div>

        {activeTab === 'products' ? (
          /* Product List */
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100 w-fit">
              {(['all', 'shop', 'design', 'both'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setProductFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                    productFilter === filter 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Page</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <Loader2 className="animate-spin mx-auto text-[#0066cc]" size={32} />
                      </td>
                    </tr>
                  ) : products.filter(p => productFilter === 'all' || p.targetPage === productFilter).length > 0 ? (
                    products
                      .filter(p => productFilter === 'all' || p.targetPage === productFilter)
                      .map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img 
                              src={product.image} 
                              className="w-12 h-12 rounded-lg object-cover bg-gray-100" 
                              alt="" 
                              referrerPolicy="no-referrer"
                            />
                            <span className="font-bold text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-[#0066cc]">{formatPrice(product.price)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest",
                            product.targetPage === 'design' ? "bg-purple-100 text-purple-600" : 
                            product.targetPage === 'both' ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                          )}>
                            {product.targetPage || 'shop'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleOpenModal(product)}
                              className="p-2 text-gray-400 hover:text-[#0066cc] hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                        No products found. Add your first product to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        ) : (
          /* Page Content List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['home', 'shop', 'design', 'about'].map(pageId => {
              const page = pageContents.find(p => p.pageId === pageId);
              return (
                <div key={pageId} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                  <div className="h-32 bg-gray-100 relative overflow-hidden">
                    {page?.heroImage ? (
                      <img 
                        src={page.heroImage} 
                        className="w-full h-full object-cover" 
                        alt="" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenPageModal(page || { pageId })}
                        className="bg-white text-[#0066cc] px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-[#0066cc] hover:text-white transition-all"
                      >
                        Edit Page
                      </button>
                      {(pageId === 'shop' || pageId === 'design') && (
                        <button 
                          onClick={() => {
                            setActiveTab('products');
                            setProductFilter(pageId);
                            handleOpenModal(null, pageId);
                          }}
                          className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-gray-900 hover:text-white transition-all"
                        >
                          Add Product
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-gray-900 capitalize">{pageId} Page</h3>
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0066cc]">
                        <FileText size={16} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {page ? `Last updated: ${new Date(page.updatedAt?.seconds * 1000).toLocaleDateString()}` : 'Not yet configured'}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <div className={cn("w-2 h-2 rounded-full", page?.heroTitle ? "bg-green-500" : "bg-gray-300")}></div>
                        Hero Title
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <div className={cn("w-2 h-2 rounded-full", page?.heroImage ? "bg-green-500" : "bg-gray-300")}></div>
                        Hero Image
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 sm:px-8 sm:py-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 p-2">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                  <input 
                    required
                    type="text" 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price ($)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Old Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({...formData, oldPrice: parseFloat(e.target.value)})}
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Image</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative group">
                    {(imagePreview || formData.image) ? (
                      <>
                        <img 
                          src={imagePreview || formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            setFormData({...formData, image: ''});
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          title="Remove Image"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    ) : (
                      <ImageIcon className="text-gray-300" size={32} />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer p-2 bg-white rounded-full text-gray-900 hover:bg-[#0066cc] hover:text-white transition-all">
                        <Upload size={16} />
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </div>
                  </div>
                  <div className="flex-grow space-y-2">
                    <input 
                      type="url" 
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none"
                    />
                    <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">
                      <Upload size={14} className="text-[#0066cc]" />
                      <span className="text-xs font-bold text-gray-700">Upload from device</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Display On Page</label>
                <div className="flex gap-4">
                  {(['shop', 'design', 'both'] as const).map((page) => (
                    <label key={page} className="flex items-center gap-2 cursor-pointer group">
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                        formData.targetPage === page ? "bg-[#0066cc] border-[#0066cc]" : "border-gray-300 group-hover:border-[#0066cc]"
                      )}>
                        {formData.targetPage === page && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <input 
                        type="radio" 
                        name="targetPage"
                        className="hidden"
                        checked={formData.targetPage === page}
                        onChange={() => setFormData({...formData, targetPage: page})}
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">{page}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                    formData.isNew ? "bg-[#0066cc] border-[#0066cc]" : "border-gray-300 group-hover:border-[#0066cc]"
                  )}>
                    {formData.isNew && <Check size={14} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                  />
                  <span className="text-sm font-medium text-gray-700">New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                    formData.isBestSeller ? "bg-[#0066cc] border-[#0066cc]" : "border-gray-300 group-hover:border-[#0066cc]"
                  )}>
                    {formData.isBestSeller && <Check size={14} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({...formData, isBestSeller: e.target.checked})}
                  />
                  <span className="text-sm font-medium text-gray-700">Best Seller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                    formData.isTopRated ? "bg-[#0066cc] border-[#0066cc]" : "border-gray-300 group-hover:border-[#0066cc]"
                  )}>
                    {formData.isTopRated && <Check size={14} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={formData.isTopRated}
                    onChange={(e) => setFormData({...formData, isTopRated: e.target.checked})}
                  />
                  <span className="text-sm font-medium text-gray-700">Top Rated</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                    formData.featured ? "bg-[#0066cc] border-[#0066cc]" : "border-gray-300 group-hover:border-[#0066cc]"
                  )}>
                    {formData.featured && <Check size={14} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-grow bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex-grow bg-[#0066cc] text-white py-4 rounded-xl font-bold hover:bg-[#0052a3] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="animate-spin" size={20} />}
                  {isSaving ? (isUploading ? "Uploading..." : "Saving...") : (editingProduct ? "Update Product" : "Add Product")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Page Content Modal */}
      {isPageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPageModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 sm:px-8 sm:py-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 capitalize">
                Edit {pageFormData.pageId} Page
              </h2>
              <button onClick={() => setIsPageModalOpen(false)} className="text-gray-400 hover:text-gray-900 p-2">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handlePageSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hero Title</label>
                  <input 
                    required
                    type="text" 
                    value={pageFormData.heroTitle}
                    onChange={(e) => setPageFormData({...pageFormData, heroTitle: e.target.value})}
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hero Subtitle</label>
                  <input 
                    type="text" 
                    value={pageFormData.heroSubtitle}
                    onChange={(e) => setPageFormData({...pageFormData, heroSubtitle: e.target.value})}
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hero Image</label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative group">
                      {(imagePreview || pageFormData.heroImage) ? (
                        <>
                          <img 
                            src={imagePreview || pageFormData.heroImage} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                              setPageFormData({...pageFormData, heroImage: ''});
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            title="Remove Image"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <ImageIcon className="text-gray-300" size={40} />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer p-2 bg-white rounded-full text-gray-900 hover:bg-[#0066cc] hover:text-white transition-all">
                          <Upload size={20} />
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                      </div>
                    </div>
                    <div className="flex-grow space-y-2">
                      <input 
                        type="url" 
                        placeholder="Hero Image URL"
                        value={pageFormData.heroImage}
                        onChange={(e) => setPageFormData({...pageFormData, heroImage: e.target.value})}
                        className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none"
                      />
                      <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">
                        <Upload size={16} className="text-[#0066cc]" />
                        <span className="text-xs font-bold text-gray-700">Upload New Hero</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Body Content / Description</label>
                  <textarea 
                    rows={6}
                    value={pageFormData.content}
                    onChange={(e) => setPageFormData({...pageFormData, content: e.target.value})}
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#0066cc] outline-none resize-none"
                    placeholder="Enter page content here..."
                  />
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsPageModalOpen(false)}
                  className="flex-grow bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex-grow bg-[#0066cc] text-white py-4 rounded-xl font-bold hover:bg-[#0052a3] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="animate-spin" size={20} />}
                  {isSaving ? (isUploading ? "Uploading..." : "Saving...") : "Update Page"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
