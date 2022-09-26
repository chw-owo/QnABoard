import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from "axios";

function Board() {

  const [viewContent, setViewContent] = useState([]);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const total = viewContent.length;
  const numPages = Math.ceil(total / limit);
  

  useEffect(()=>{
    Axios.get("http://localhost:8000/list")
    .then((res)=>{
      console.log(res.data);
      setViewContent(res.data);
    })
  }, [])

  return (
    <div className="Board">
      <div class = "body">
      
        <h2 class = "main-title">Today's Question</h2>
                  
        <div class="box">
          <div class="container">
            <div class="row">
            
                 
            
                  {viewContent.slice(offset, offset + limit).map(element =>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    
                  <div class="box-part text-center"> 
                    <div class="title">
                      <h4>{element.TITLE}</h4>
                    </div>
                                
                    <div class="text">
                      <span>{element.CONTENT}</span>
                    </div>
                                
                    <Link to={`/detail/${element.idpost}`}>Read More</Link>
                    </div>
                    </div>
             
                  )}
                  
                              
                	 
              
            
          
          </div>		
          </div>

          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <button class="page-item page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
              </button>

              {Array(numPages)
                .fill()
                .map((_, i) => (
                  <button 
                  class="page-item page-link"
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    aria-current={page === i + 1 ? "page" : null}
                  >
                    {i + 1}
                  </button>
                ))}
        

              <button class="page-item page-link" onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
              </button>
            </ul>
        </nav>

        </div>

        

      </div>
    </div>
  );
}

export default Board;
