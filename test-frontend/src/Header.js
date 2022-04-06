export default function Header({title, index, total}) {
    return (
      <div className='title'>
        <h1>{title}</h1>
        <h3>{index}/{total}</h3>
      </div>
    );
}