import { memo } from 'react';

export default memo(({correct, fake, onTick, status, order}) => {
    let correctClassName = 'spotfake-img ' + (status == 1 ? 'correct' : (status == 3 ? 'disabled' : ''));
    let fakeClassName = 'spotfake-img ' + (status == 2 ? 'wrong' : (status == 3 ? 'disabled' : ''));
    return (
      <div className='spotfake'>
        {
          order == 1 ? (
            <>
              <img className={correctClassName} src={correct} onClick={() => status == 0 && onTick(true)}/>
              <img className={fakeClassName} src={fake} onClick={() => status == 0 && onTick(false)}/>
            </>
          ) : (
            <>
              <img className={fakeClassName} src={fake} onClick={() => status == 0 && onTick(false)}/>
              <img className={correctClassName} src={correct} onClick={() => status == 0 && onTick(true)}/>
            </>
          )
        }
        
      </div>
    )
  });
  