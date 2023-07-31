import { useState, useRef } from "react";
import SidebarButton from "./utils/SideBarButton";
import SidebarAnepIcon from "./utils/SidebarAnepIcon";
import { Icon } from "@iconify/react";

function Sidebar() {
    const [show, setShow] = useState(true);
    const container = useRef(null);

    const handleIconClick = () => {
        setShow(!show);

        if (container.current) {
            container.current.classList.toggle("w-52");
            container.current.classList.toggle("w-16");
        }
    };
    const SidebarButtons = [
        { link: "/", title: "Accueil", icon: "material-symbols:home", state: show },
        { link: "/emplois", title: "Emplois", icon: "material-symbols:work", state: show },
        {
            link: "employees",
            title: "Employées",
            icon: "material-symbols:groups-rounded",
            state: show
        },
        {
            link: "competences",
            title: "Compétences",
            icon: "material-symbols:assignment-outline",
            state: show
        },
        { link: "modules", title: "Modules", icon: "material-symbols:library-books-outline", state: show }
    ];

    return (
        <div className="transition-all duration-500 drop-shadow-black-sm">
            <div
                ref={container}
                className="sticky top-3 w-52 bg-anep-secondary rounded-xl transition-all duration-500"
            >
                {/* anep image */}
                <SidebarAnepIcon state={show} />

                {/* arrow icon */}
                <i
                    onClick={handleIconClick}
                    className={`top-10 p-1 text-white text-3xl absolute bg-anep-primary rounded-full cursor-pointer -right-4 ${
                        show ? "rotate-180" : "rotate-0"
                    } transition-all duration-500`}
                >
                    <Icon icon="material-symbols:arrow-forward-ios-rounded" className="translate-x-0.5" />
                </i>

                {/* links */}
                <div className="flex flex-col gap-y-5 py-4">
                    {SidebarButtons.map((btn) => {
                        return (
                            <SidebarButton
                                key={btn.link}
                                link={btn.link}
                                title={btn.title}
                                icon={btn.icon}
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
