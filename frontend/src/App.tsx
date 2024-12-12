import './index.css'
import './App.css'

function App(){
  return (
    <div className="w-screen border-black border-2">
      <Brain/>
    </div>
  )
}

function Brain(){
    return (
      <div className="flex  w-screen">
        <SideBar></SideBar>
        <ContentScreen></ContentScreen>
      
      </div>
    )
}

function SideBar(){
  return(
    <div className="bg-white  w-96 border-r-gray-200 border-r-2">
      <h1 className="text-4xl mt-4 ml-2 mr-2"><i className="fa-solid fa-brain"></i> No Brainer</h1>
      <TypeBox/>
    </div>
  )
}

function TypeBox(){
  return (
    <div className="mt-8 ml-8 text-2xl text-gray-600">
      <div className="mb-8 cursor-pointer"><i className="mr-6 fa-brands fa-twitter"></i>Tweets</div>
      <div className="mb-8 cursor-pointer"><i className="mr-6 fa-solid fa-video"></i>Videos</div>
      <div className="mb-8 cursor-pointer"><i className="mr-8 fa-solid fa-file"></i>Documents</div>
      <div className="mb-8 cursor-pointer"><i className="mr-5 fa-solid fa-link"></i>Links</div>
      <div className="mb-8 cursor-pointer"><i className="mr-7 fa-solid fa-tag"></i>Tags</div>
    </div>
  )
}

function ContentScreen(){
  return(
    <div className="bg-[#F9FBFC] flex-1 p-20">
      <AllNotes/>
      
    </div>
  )
}

function AllNotes(){
  return (
    <div className="mt-8 border-0 border-black">
      <div className="flex">
      <h1 className=" text-4xl">All Notes</h1>

      <div className="ml-auto mr-8 text-2xl">
        <button className="mr-4 rounded-lg p-2  bg-[#E1E6FF] text-[#5d59e0]"><i className="fa-solid fa-share-nodes mr-2 text-[#5046E4]"></i>Share</button>
        <button className="mr-2 rounded-lg p-2 bg-[#5046E4] text-white" ><i className="fa-solid fa-plus mr-2 "></i>Add Content</button>

      </div>

      </div>

      <div id="cards" className="flex flex-wrap mt-8 gap-5">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  )
}

function Card(){
  return (
    <div className="bg-[#FFFFFF] border-2 border-gray-200 w-80 h-96 rounded-lg">
      Card
    </div>
  )
}
/**/
export default App
