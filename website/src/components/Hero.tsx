interface Props {
    title: string;
    description: string;
}

export default function Hero(props : Props){
    return(
        <div className="flex justify-center, ">
            <div className="bg-green-400">
                <h1 className="font-bold">{props.title}</h1>
                <p className="text-lg">{props.description}</p>
            </div>
        </div>
    );
}