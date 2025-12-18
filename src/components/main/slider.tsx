import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LoginIcon from '@mui/icons-material/Login';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HttpIcon from '@mui/icons-material/Http';
import Card from './card';
import { useRef } from "react";

const Slider = () =>{
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const bgColorCards = ['#FFFFFF', '#e0dcf2ff', '#a5cafbff', '#ECFDF5', '#FEF2F2']
    const cards = dataInfoProject.map((item, i) =>({
        ...item, bg: bgColorCards[i % bgColorCards.length]
    }))
    console.log(cards)

    const scrollLeft = () => {
        if (sliderRef.current)
            sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        if (sliderRef.current)
            sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };
        return(
                <div className='relative w-[845px] mx-auto my-[16px] px-[33px]'>
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/70 text-white px-3 py-2 rounded-full"
                    >
                        ‹
                    </button>
                    <div 
                        ref={sliderRef}
                        className='flex gap-[15px] overflow-x-auto scroll-smooth snap-x snap-mandatory snap-x snap-mandatory no-scrollbar'
                    >
                        {cards.map((card) => (
                            <Card 
                                key={card.id}
                                id={card.id}
                                image={card.image} 
                                lable={card.lable} 
                                text={card.text} 
                                availability={card.availability}
                                bg={card.bg} 
                            />
                        ))}
                    </div>
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/70 text-white px-3 py-2 rounded-full"
                    >
                        ›
                    </button>    
                </div>
        )

}

export default Slider

const dataInfoProject = [{
    id: 1,
    image: <LoginIcon />,
    lable: 'Set up Supabase authentication',
    text: 'Integrate Supabase Auth for user login, registration, and session handling using the Supabase client.',
    availability: true
},
{
    id: 2,
    image: <FormatListNumberedIcon />,
    lable: 'Create wishlist groups (bookmarks) and list',
    text: 'Develop functionality for creating, editing, and deleting groups that contain user todos.',
    availability: true
},
{
    id: 3,
    image: <ModeEditIcon />,
    lable: 'Add modal windows for creating and editing data',
    text: 'Implement modals for adding todos, editing bookmark groups, and other interactive UI features.',
    availability: true
},
{
    id: 4,
    image: <AccountBoxIcon />,
    lable: 'Add user profile ',
    text: 'Create a profile menu with options like settings, logout, and user info.',
    availability: false
},
{
    id: 5,
    image: <HttpIcon />,
    lable: 'Add url from another shops',
    text: 'Add in wishlist url with info from page shop.',
    availability: false
}]