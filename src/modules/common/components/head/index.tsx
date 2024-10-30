

type HeadProps = {
    title?: string;
    description?: string | null;
    image?: string | null;
}

const Head: React.FC<HeadProps> = ({title,description,image}) => {
    return(
        // <NextHead></NextHead>
        <div></div>
    )
}

export default Head;