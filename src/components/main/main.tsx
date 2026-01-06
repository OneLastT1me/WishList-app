import { useNavigate } from "react-router-dom";
import MainButton from "../common/button"
import Slider from "./slider"

const Main = () =>{
const navigate = useNavigate();

    return(
      <div className=" min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className=" container mx-auto py-16  text-center mx-auto ">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 p-4 rounded-full">    
            </div>
          </div>
          <h1 className="mb-6 text-gray-900">
            Organize Your Life with TodoList
          </h1>
          <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
            The simple and elegant way to manage your tasks. Stay productive, organized, and focused on what matters most.
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <MainButton size="lg" onClick={() => navigate('/WishList')}>Get Started Free</MainButton>
            <MainButton size="lg" variant="outline" >Login</MainButton>
          </div>
          <Slider />
        <div className="flex gap-4 justify-center mt-[45px]"> 
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="mb-4 text-white">
              Ready to Get Organized?
            </h2>
            <p className="mb-8 text-indigo-100 max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity with our simple todo list app.
            </p>
            <MainButton 
              size="lg" variant="outline" 
              onClick={() => navigate('/WishList')}>
                Start Managing Your Tasks
            </MainButton>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Main