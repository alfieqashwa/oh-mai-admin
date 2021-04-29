export const BorderWithThreeDots = props =>
  <div className="flex items-center justify-between my-4">
    <h4 className="w600">{props.title}</h4>
    <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
    <BsThreeDotsVertical className="w-5 h-5 mr-2 text-N0" />
  </div>