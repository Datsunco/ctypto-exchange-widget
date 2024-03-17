import { Combobox } from "../ui/ComboBox";
import { Input } from "../ui/input";


const Exchange = () => {
    return (
        <div className="flex row rounded-l-xl">
            <Input className="w-[150px] h-[50px] rounded-none rounded-l-xl"/>
            <Combobox/>
        </div>
    );
};

export default Exchange;