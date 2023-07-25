import { Avatar } from "@material-tailwind/react";
 
export default function Profile_picture(Taille,Alt,Source) {
  return (
    <Avatar 
      size={Taille}
      alt={Alt}
      src={Source}
    //   size="lg" 
    //   alt="avatar"
    //   src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" 
      className="ring-1 ring-white border  shadow-xl "
    />
  );
}
