import {blockchainAnimation} from '../assets';

const Loader = ({ title }) => {
  
  //function to capitalize the title

  const capitalize = (str = '') => {
    return str?.charAt(0).toUpperCase() + str.slice(1);
  };




  return (
    <div className="" style={{width: '100%', height: '100%', align: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>

      <img src={blockchainAnimation} alt="loader" className="" style={{height: '20%'}}/> 

      <h1>
        {`Loading ${capitalize(title)}` || "Loading..."}
      </h1>   

    </div>
)};

export default Loader;
