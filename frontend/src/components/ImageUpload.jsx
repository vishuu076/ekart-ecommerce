import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { X, UploadCloud, Image as ImageIcon } from "lucide-react";


const ImageUpload = ({ productData = { productImg: [] }, setProductData }) => {

    const handlefiles = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            setProductData(prev => ({
                ...prev,
                productImg: [...(prev.productImg || []), ...files],
            }));
        }
    }

    const removeImage = (index) => {
        setProductData((prev) => {
            const updateImages = prev.productImg.filter((_, i) => i !== index);
            return { ...prev, productImg: updateImages }
        })
    }

    return (
        <div className="grid gap-2.5">
            <Label className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                <ImageIcon className="h-4 w-4 text-pink-500" />
                Product Images
            </Label>

            <div className="grid gap-3">
                <Input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handlefiles}
                />

                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-pink-100 rounded-xl bg-white hover:bg-pink-50/50 hover:border-pink-300 cursor-pointer transition-all duration-300 group shadow-sm"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <UploadCloud className="w-12 h-12 mb-3 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                        <p className="mb-1 text-sm text-gray-700 font-medium">
                            <span className="text-pink-600 font-bold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">High-quality PNG, JPG or WebP (Max 5MB)</p>
                    </div>
                </label>
            </div>

            {productData?.productImg?.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3">
                    {productData.productImg.map((file, idx) => {
                        let preview;
                        if (file instanceof File) preview = URL.createObjectURL(file);
                        else if (typeof file === "string") preview = file;
                        else if (file?.url) preview = file.url;
                        else return null;

                        return (
                            <div key={idx} className="relative group overflow-hidden rounded-lg border border-pink-100 shadow-sm">
                                <img
                                    src={preview}
                                    alt=""
                                    className="object-cover w-full h-32 group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button 
                                        onClick={()=>removeImage(idx)} 
                                        className="bg-white/90 hover:bg-white text-red-600 p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                        title="Remove Image"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                    <p className="text-[10px] text-white truncate">
                                        {file.name || "Product Image"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}


export default ImageUpload
