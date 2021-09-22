

export default function BookCard(props){
  const {
    title,
    cover,
    author,
    publishedDate
  } = props;


  return (
    <div>
      <div>{title}</div>
      <div>{cover}</div>
      <div>{author}</div>
      <div>{publishedDate}</div>
    </div>
  )
}