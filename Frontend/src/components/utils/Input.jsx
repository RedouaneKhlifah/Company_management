import { Input } from "@material-tailwind/react";

function Input({ label }) {
    return (
        <div className="w-72">
            <Input label={label} />
        </div>
    );
}

export default Input;
