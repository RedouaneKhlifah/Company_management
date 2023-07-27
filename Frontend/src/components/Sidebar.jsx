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
        { link: "accueil", title: "Accueil", imgsrc: "/imgsrc", state: show },
        { link: "/emplois", title: "Emplois", imgsrc: "/imgsrc", state: show },
        {
            link: "employee",
            title: "Employées",
            imgsrc: "/imgsrc",
            state: show
        },
        {
            link: "competence",
            title: "Compétences",
            imgsrc: "/imgsrc",
            state: show
        },
        { link: "module", title: "Modules", imgsrc: "/imgsrc", state: show }
    ];

    return (
        <div className=" relative">
            <div
                className={`${
                    show ? "w-11/12" : " w-8/12"
                } bg-anep-secondary ml-2 mt-2 rounded-lg transition-all duration-500`}
            >
                {/* anep image */}
                <SidebarAnepIcon state={show} />

                {/* arrow icon */}
                {
                    <IoIosArrowDropleftCircle
                        onClick={handleIconClick}
                        className={`text-anepBlue text-2xl absolute top-12 ${
                            show ? "right-0" : "right-4"
                        } ${
                            show ? "rotate-0" : "rotate-180"
                        } transition-all duration-500`}
                    />
                }

                {/* links */}
                <div className="flex flex-col gap-y-5  py-4">
                    {SidebarButtons.map((btn) => {
                        return (
                            <SidebarButton
                                key={btn.link}
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
