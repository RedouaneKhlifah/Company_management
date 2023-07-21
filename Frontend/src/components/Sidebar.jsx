import { useState } from "react";
import SidebarButton from "./utils/SideBarButton";
import SidebarAnepIcon from "./utils/SidebarAnepIcon";
import { IoIosArrowDropleftCircle } from "react-icons/io";

function Sidebar() {
    const [show, setShow] = useState(true);

    const handleIconClick = () => {
        setShow(!show);
        console.log("test");
    };
    const SidebarButtons = [
        { link: "/emplois", title: "Accueil", imgsrc: "/imgsrc", state: show },
        { link: "/emplois", title: "emplois", imgsrc: "/imgsrc", state: show },
        {
            link: "/emplois",
            title: "Employées",
            imgsrc: "/imgsrc",
            state: show
        },
        {
            link: "/emplois",
            title: "Compétences",
            imgsrc: "/imgsrc",
            state: show
        },
        { link: "/emplois", title: "Modules", imgsrc: "/imgsrc", state: show }
    ];

    return (
        <div className="w-2/12 relative">
            <div
                className={`${
                    show ? "w-11/12" : " w-4/12"
                } bg-lighterGray ml-2 mt-2 rounded-lg transition-all duration-500`}
            >
                <SidebarAnepIcon state={show} />
                {
                    <IoIosArrowDropleftCircle
                        onClick={handleIconClick}
                        className={`text-anepBlue text-2xl absolute top-12 ${
                            show ? "right-0" : "right-32"
                        } rotate-${show ? 0 : 180} transition-all duration-500`}
                    />
                }
                <div className="flex flex-col gap-y-5 items-center py-4">
                    {SidebarButtons.map((btn) => {
                        return (
                            <SidebarButton
                                link={btn.link}
                                title={btn.title}
                                imgsrc={btn.imgsrc}
                                state={btn.state}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
