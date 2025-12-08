import { FiUploadCloud } from 'react-icons/fi';
import { MdAdd, MdPhotoLibrary } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addTerm, resetCard, setGroupDetails } from '../../state/slices/create-card/createCardSlice';
import { toast } from 'react-toastify';
import Terms from './Terms';
import Input from './Input';
import { fileToBase64 } from '../../utils/fileToBase64';
import { IoMdArrowForward } from 'react-icons/io';
import { addCard, resetAllCards } from '../../state/slices/cards/cardsSlice';
import { useState } from 'react';


const Section = ({ children }) => {
    return (
        <div className='bg-white rounded-md p-6 border border-zinc-200 shadow-md'>
            {children}
        </div>
    )
}

const CreateCard = () => {
    const dispatch = useDispatch();
    const group = useSelector((state) => state.createCard.group);
    const terms = useSelector((state) => state.createCard.terms);
    const [creating, setCreating] = useState(false);
    const cards = useSelector((state) => state.cards);
    console.log(cards);
    

    const handleAddTerm = () => {
        const lastTerm = terms[terms.length - 1];
        if (lastTerm.name === "" || lastTerm.definition === "") {
            toast.error("Please fill all the fields first");
            return;
        }
        dispatch(addTerm());
    }

    const handleChange = (e) => {
        dispatch(setGroupDetails({ ...group, [e.target.name]: e.target.value }));
    }

    const handleCoverUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return;
        }

        if (file.size > 250 * 1024) {
            toast.error("Image must be under 250KB");
            return;
        }

        const base64 = await fileToBase64(file);

        dispatch(setGroupDetails({ ...group, coverImg: base64 }));
    }

    const removeCover = () => {
        dispatch(setGroupDetails({...group, coverImg: ""}));
    }

    const validateCard = () => {
        const hasInvalidTerm = terms.some((term) => (term.name === "" || term.definition === ""));
        return (group.name === "" || group.description === "" || hasInvalidTerm);
    }

    const handleCreateCard = () => {
        if(validateCard()){
            toast.error("Please fill all the required fields");
            return;
        }
        setCreating(true);
        try {
            dispatch(addCard({
                name: group.name,
                description: group.description,
                coverImg: group.coverImg,
                terms: terms
            }))

            toast.success("Card created successfully");
        } catch (error) {
            toast.error(error || error.message || "Something went wrong while creating the card");
        } finally {
            dispatch(resetCard());
            setCreating(false);
        }
        
    }

    return (
        <div className='flex flex-col gap-6'>
            {/* Remove later */}
            {/* <button className='' onClick={() => dispatch(resetAllCards())}>Reset</button> */}


            <Section>
                <div className='grid grid-cols-4 gap-x-8'>
                    <div className='col-span-3 flex flex-col gap-4'>
                        <Input label="Group Name*" name="name" value={group.name} onChange={handleChange} placeholder="e.g. Web Development Basics" />
                        <Input as="textarea" label="Add description*" value={group.description} onChange={handleChange} name="description" placeholder="What is this about?" className="resize-none" rows={5} />

                    </div>
                    <div className='flex flex-col gap-1 text-sm'>
                        <div className='flex items-center justify-between'>
                            <p className='text-zinc-500 font-[550]'>Cover photo (Optional)</p>
                            {
                                group.coverImg && (
                                    <p className='text-red-600 hover:underline cursor-pointer text-[10px] font-semibold' onClick={removeCover}>Remove</p>

                                )
                            }
                        </div>

                        {
                            group.coverImg ? (
                                <div className='relative group cursor-pointer w-full rounded-md h-[196px] overflow-hidden'>
                                    <img
                                        src={group.coverImg}
                                        alt="Cover Preview"
                                        className='object-cover w-full h-full'
                                    />

                                    <label htmlFor='cover-img' className='group-hover:visible invisible cursor-pointer absolute top-0 left-0 w-full h-full grid place-items-center bg-black/30'>
                                        <div className='flex flex-col items-center gap-1 text-white/70'>
                                            <span className='text-3xl'><MdPhotoLibrary /></span>
                                            <p>Change cover photo</p>
                                        </div>
                                    </label>
                                </div>
                            ) : (
                                <>
                                    <label htmlFor="cover-img" className='bg-zinc-50 h-full border-2 rounded-md border-zinc-300 border-dashed flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/80 hover:border-blue-700'>
                                        <span className='text-5xl text-blue-900'><FiUploadCloud /></span>
                                        <p className='font-semibold mt-2 text-sm text-blue-900'>Click to upload cover photo</p>
                                        <p className='text-[10px] text-zinc-400'>Supported: JPG, JPEG, PNG (Max 250KB) </p>
                                    </label>
                                </>
                            )
                        }
                        <input type="file" name="cover-img" id="cover-img" hidden accept="image/*" onChange={handleCoverUpload} />

                    </div>
                </div>
            </Section>

            <Section>
                <div className='flex flex-col gap-5'>

                    {
                        terms?.map((term, index) => (
                            <Terms term={term} index={index} key={index} />
                        ))
                    }
                </div>

                <div onClick={handleAddTerm} className='mt-2 flex items-center gap-1 font-semibold text-blue-600 cursor-pointer hover:bg-blue-100 w-fit p-0.5 px-1.5 rounded-sm'>
                    <span><MdAdd /></span>
                    <p className='text-[13px]'>Add more</p>
                </div>
            </Section>

            <div className='flex justify-center '>
                <button disabled={creating} onClick={handleCreateCard} className={`${creating ? "bg-zinc-300 cursor-not-allowed" : "cursor-pointer hover:bg-blue-600 bg-dark-blue" } flex items-center justify-center gap-2 text-white rounded-md p-2 w-[150px]`}>
                    <span>{creating ? "Creating" : "Create"}</span>
                    <span><IoMdArrowForward /></span>
                </button>
            </div>
        </div>
    )
}

export default CreateCard