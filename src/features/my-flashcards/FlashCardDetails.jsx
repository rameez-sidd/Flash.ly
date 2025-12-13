import { useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { IoMdArrowBack } from 'react-icons/io';
import { MdFileDownload, MdShare } from 'react-icons/md';
import { RiPrinterFill, RiWhatsappFill } from 'react-icons/ri';
import { TbCardsFilled, TbCopyCheckFilled } from 'react-icons/tb';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'
import Modal from '../../shared/components/Modal';
import { BASE_URL } from '../../utils/constants';
import { FaFacebook } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';
import { BsLinkedin, BsTwitterX } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { toast } from 'react-toastify';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ShareModal = ({ url }) => {

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Copied to clipboard", {
                autoClose: 2000,
                hideProgressBar: true,
            });
        } catch (error) {
            toast.error(`Failed to copy link - ${error || error.message}`, {
                autoClose: 2000,
                hideProgressBar: true,
            });

        }
    }


    return (
        <div>
            <div className='flex text-sm items-center gap-3 border-2 border-zinc-300 border-dashed rounded-md'>
                <p className='text-zinc-500 p-2'>Link:</p>
                <p className='line-clamp-1'>{url}</p>
                <span onClick={copyLink} className='text-base hover:bg-zinc-200/80 cursor-pointer p-2 py-2.5 h-full grid place-items-center rounded-tr-md rounded-br-md'><TbCopyCheckFilled /></span>
            </div>

            {/* Social Media Icons */}
            <div className='flex items-center justify-center gap-12 mt-4 py-4'>
                <span className='text-[27px] cursor-pointer text-[#0866ff] hover:scale-120 transition-all duration-200 ease-out'><FaFacebook /></span>
                <span className='text-[27px] cursor-pointer text-[#dd2a7b] hover:scale-120 transition-all duration-200 ease-out'><FaSquareInstagram /></span>
                <span className='text-[24px] cursor-pointer text-[#0a66c2] hover:scale-120 transition-all duration-200 ease-out'><BsLinkedin /></span>
                <span className='text-[23px] cursor-pointer  hover:scale-120 transition-all duration-200 ease-out'><BsTwitterX /></span>
                <span className='text-[27px] cursor-pointer text-[#1daa61] hover:scale-120 transition-all duration-200 ease-out'><RiWhatsappFill /></span>
                <span className='text-[25px] cursor-pointer p-1 text-[#bb001b] hover:scale-120 transition-all duration-200 ease-out'><SiGmail /></span>
            </div>
        </div>
    )

}



const FlashCardDetails = () => {
    const { pathname } = useLocation();
    const url = `${BASE_URL}${pathname}`;
    const [openShare, setOpenShare] = useState(false);
    const { cardId } = useParams();
    const cards = useSelector((state) => state.cards);

    const myCard = cards?.find((card) => card.id === cardId);
    const [currentTerm, setCurrentTerm] = useState(0);

    const handleNext = () => {
        if (currentTerm === myCard.terms.length - 1) return;
        setCurrentTerm(currentTerm + 1);
    }

    const handlePrevious = () => {
        if (currentTerm === 0) return;
        setCurrentTerm(currentTerm - 1);
    }

    const generatePDF = (action = "download") => {
        if (!myCard) return;

        const doc = new jsPDF("p", "mm", "a4");

        // Title
        doc.setFontSize(18);
        doc.text(myCard.name, 14, 20);

        // Description
        doc.setFontSize(11);
        doc.setTextColor(80);
        doc.text(myCard.description || "", 14, 28, { maxWidth: 180 });

        // Table data
        const tableBody = myCard.terms.map((term, index) => [
            index + 1,
            term.name,
            term.definition
        ]);

        autoTable(doc, {
            startY: 38,
            head: [["#", "Term", "Definition"]],
            body: tableBody,
            styles: {
                fontSize: 10,
                cellPadding: 4,
                valign: "top"
            },
            headStyles: {
                fillColor: [30, 64, 175] // blue-800
            },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 50 },
                2: { cellWidth: 110 }
            }
        });

        if (action === "print") {
            doc.autoPrint();
            window.open(doc.output("bloburl"), "_blank");
        } else {
            doc.save(`${myCard.name}.pdf`);
        }
    };

    return (
        <div className='flex flex-col gap-6'>

            {/* Go back link */}
            <Link to="/my-flashcards" className='flex items-center gap-2 font-semibold text-blue-800 cursor-pointer hover:bg-blue-100/70 hover:px-2 transition-all duration-200 ease-out w-fit py-1 rounded-md text-sm '>
                <span><IoMdArrowBack /></span>
                <span className='text-xs'>Go back</span>
            </Link>

            {/* Title and Description */}
            <div className='flex flex-col gap-3'>
                <h3 className='text-lg font-semibold'>{myCard.name}</h3>
                <p className='text-sm text-zinc-700'>{myCard.description}</p>
            </div>

            {/* Main content */}
            <div className='flex max-lg:flex-col gap-4 md:w-[730px] lg:w-full md:mx-auto lg:mx-0'>

                {/* Sidebar */}
                <div className='bg-white shadow-sm rounded-sm p-4 min-w-[250px] xl:min-w-[300px]'>
                    <h5 className='flex items-center gap-2 pb-3 border-b border-zinc-300'>
                        <span><TbCardsFilled /></span>
                        <span className='font-semibold'>Flashcards</span>
                    </h5>
                    <div className='flex flex-col gap-1 py-3'>
                        {
                            myCard.terms.map((term, index) => (
                                <div onClick={() => setCurrentTerm(index)} key={index} className={`${currentTerm === index ? "text-blue-900 bg-blue-200/40" : "hover:bg-blue-100/40 text-zinc-600"} flex cursor-pointer rounded-md p-1 font-[550]  items-center gap-2 text-sm `}>
                                    <span className='text-[10px]'><VscDebugBreakpointLog /></span>
                                    <span className='line-clamp-2 text-[13px]'>{term.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Term content */}
                <div className='bg-white shadow-sm rounded-sm p-4 text-sm text-justify w-full'>

                    {/* Term Image */}
                    <div className='w-full sm:w-[300px] sm:h-auto sm:float-right sm:ml-5 mb-4 sm:mb-2 rounded-md flex justify-center overflow-hidden'>
                        <img src={myCard.terms[currentTerm].termImg} className='object-contain rounded-md' />
                    </div>

                    {/* Term Definition */}
                    {myCard.terms[currentTerm].definition}

                </div>

                {/* Buttons */}
                <div className='flex max-lg:justify-center lg:flex-col gap-3'>

                    {/* Share */}
                    <button onClick={() => setOpenShare(true)} className='xs:w-[120px] lg:w-full xs:justify-center lg:justify-start flex cursor-pointer hover:bg-blue-800/40 hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-200 ease-out  items-center gap-2 bg-white py-1.5 px-4 xs:pr-6 shadow-sm rounded-md font-[550]'>
                        <span><MdShare /></span>
                        <span className='text-sm'>Share</span>
                    </button>

                    {/* Download */}
                    <button onClick={() => generatePDF("download")} className='xs:w-[120px] lg:w-full xs:justify-center lg:justify-start flex cursor-pointer hover:bg-blue-800/40 hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-200 ease-out  items-center gap-2 bg-white py-1.5 px-4 xs:pr-6 shadow-sm rounded-md font-[550]'>
                        <span><MdFileDownload /></span>
                        <span className='text-sm'>Download</span>
                    </button>

                    {/* Print */}
                    <button onClick={() => generatePDF("print")} className='xs:w-[120px] lg:w-full xs:justify-center lg:justify-start flex cursor-pointer hover:bg-blue-800/40 hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-200 ease-out  items-center gap-2 bg-white py-1.5 px-4 xs:pr-6 shadow-sm rounded-md font-[550]'>
                        <span><RiPrinterFill /></span>
                        <span className='text-sm'>Print</span>
                    </button>

                </div>
            </div>

            {/* Navigation - Previous and Next */}
            <div className='flex justify-center text-zinc-700'>
                <div className='flex items-center gap-8'>
                    <span className='text-xl cursor-pointer rounded-full hover:bg-zinc-200' onClick={handlePrevious}><GrFormPrevious /></span>
                    <p className='text-sm'>
                        {currentTerm + 1} / {myCard.terms.length}
                    </p>
                    <span className='text-xl cursor-pointer rounded-full hover:bg-zinc-200' onClick={handleNext}><GrFormNext /></span>
                </div>
            </div>

            {/* Share Modal */}
            <Modal isOpen={openShare} onClose={() => setOpenShare(false)} title="Share this card">
                <ShareModal url={url} />
            </Modal>
        </div>
    )
}

export default FlashCardDetails