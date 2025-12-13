import { useDispatch, useSelector } from "react-redux";
import { removeTerm, removeTermImage, setTerms, updateTermImage } from "../../state/slices/create-card/createCardSlice";
import { RiDeleteBinFill, RiEdit2Fill, RiUpload2Line } from 'react-icons/ri';
import Input from "./Input";
import { fileToBase64 } from "../../utils/fileToBase64";
import { toast } from "react-toastify";
import { MdPhotoLibrary } from "react-icons/md";
import { useRef } from "react";


const Terms = ({ term, index }) => {
    const dispatch = useDispatch();
    const terms = useSelector((state) => state.createCard.terms);
    const termRef = useRef(null);

    const handleChange = (field, value) => {
        const updatedTerms = terms.map((item, i) => (
            i === index ? { ...item, [field]: value } : item
        ));

        dispatch(setTerms(updatedTerms));

    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return;
        }

        if (file.size > 250 * 1024) {
            toast.error("Image must be under 250KB");
            return;
        }

        const base64 = await fileToBase64(file)

        dispatch(updateTermImage({
            index,
            image: base64
        }))
    }

    const deleteTerm = (i) => {
        dispatch(removeTerm(i));
    }

    const removeImage = () => {
        dispatch(removeTermImage(index));
    }

    const editTerm = () => {
        termRef.current.focus();
    }

    return (
        <div className='flex flex-col lg:flex-row gap-5'>

            {/* Term Index */}
            <div className='pr-2'>

                <span className='bg-dark-blue w-7 h-7 rounded-full font-bold text-white grid place-items-center'>{index + 1}</span>
            </div>


            <div className='grid grid-cols-10 gap-y-4 gap-x-4 w-full'>

                {/* Term name */}
                <div className='col-span-full lg:col-span-3'>
                    <Input ref={termRef} label="Term*" name={`term-${index + 1}`} value={term?.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Enter a term" />
                </div>

                {/* Term Definition */}
                <div className='col-span-full lg:col-span-5'>
                    <Input as="textarea" label="Definition*" name={`term-definition-${index + 1}`} value={term?.definition} onChange={(e) => handleChange("definition", e.target.value)} placeholder="Write the definition here" className="resize-none" rows={3} />
                </div>

                {/* Term Image */}
                <div className='col-span-full lg:col-span-2'>
                    <div className='flex items-center justify-between'>

                        <div className='text-sm mb-1 text-zinc-500 font-[550]'>Image (Optional)</div>
                        {
                            term.termImg && (
                                <p className='text-red-600 hover:underline cursor-pointer text-[10px] font-semibold' onClick={removeImage}>Remove</p>

                            )
                        }
                    </div>
                    {

                        // Showing the image, if it is uploaded
                        term.termImg ? (
                            <div className='relative group cursor-pointer w-full bg-zinc-100 rounded-md h-[78px] overflow-hidden'>
                                <img
                                    src={term.termImg}
                                    alt="Term Image Preview"
                                    className='object-contain w-full h-full'
                                />

                                <label htmlFor={`term-img-${index + 1}`} className='group-hover:visible invisible cursor-pointer absolute top-0 left-0 w-full h-full grid place-items-center bg-black/30'>
                                    <div className='flex flex-col items-center gap-1 text-white/70'>
                                        <span className='text-xl'><MdPhotoLibrary /></span>
                                        <p className="text-xs">Change term image</p>
                                    </div>
                                </label>
                            </div>
                        ) : (

                            // Otherwise showing a label to upload the image
                            <label htmlFor={`term-img-${index + 1}`} className='border border-zinc-300 rounded-md p-2 cursor-pointer bg-zinc-50 hover:ring-2 hover:ring-blue-900/20 hover:border-blue-400 text-zinc-600 hover:bg-blue-50/70 flex items-center justify-center gap-2'>
                                <span className='text-lg font-semibold'><RiUpload2Line /></span>
                                <p className='text-sm'>Upload image</p>
                            </label>
                        )
                    }

                    <input type="file" name={`term-img-${index + 1}`} id={`term-img-${index + 1}`} hidden accept="image/*" onChange={handleImageUpload} />
                </div>
            </div>

            {/* Buttons for Edit and Delete a Term */}
            <div className='flex lg:flex-col gap-4 lg:gap-2 self-end lg:self-center pl-1'>
                <span onClick={editTerm} className={`text-blue-700 cursor-pointer hover:bg-blue-100 text-[22px]  rounded-md  flex items-center justify-center p-2`}><RiEdit2Fill /></span>
                <span onClick={() => deleteTerm(index)} className={`${index > 0 ? "text-red-800 cursor-pointer hover:bg-red-100" : "text-zinc-300 cursor-not-allowed"} text-[22px]  rounded-md  flex items-center justify-center p-2`}><RiDeleteBinFill /></span>
            </div>


        </div>
    )
}

export default Terms;