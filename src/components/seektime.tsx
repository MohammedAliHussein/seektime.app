import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DiskScheduler } from '@/lib/scheduler';

import Open from './open';
import Title from './title';
import Config from './config';
import Result from './result';
import Grid from './grid';
import Disclaimer from './disclaimer';

const Seektime = () => {
  const [configOpen, setConfigOpen] = useState<Boolean>(false);
  const [reset, setReset] = useState(false);

  const [cylinders, setCylinders] = useState<Number>(200);
  const [diskRequests, setDiskRequests] = useState<Number[]>([
    53, 98, 183, 37, 122, 14, 124, 65, 67,
  ]);

  const [animate, setAnimate] = useState<boolean>(true);
  const [_animate, _setAnimate] = useState<boolean>(true);

  const [_algorithm, _setAlgorithm] = useState('FCFS');
  const [_direction, _setDirection] = useState(null);
  const [_cylinders, _setCylinders] = useState<Number>(200);
  const [_diskRequests, _setDiskRequests] = useState([
    53, 98, 183, 37, 122, 14, 124, 65, 67,
  ]);

  const [seekTime, setSeekTime] = useState<Number>(640);

  useEffect(() => {
    let result = 0;

    for (let i = 1; i < diskRequests.length; i++) {
      result += Math.abs(diskRequests[i] - diskRequests[i - 1]);
    }

    setSeekTime(result);
  }, [diskRequests]);

  const handleConfirmConfig = () => {
    setConfigOpen(false);

    try {
      const result = new DiskScheduler({
        selected_algorithm: _algorithm,
        disk_requests: _diskRequests,
        head_direction: _direction,
        cylinders: _cylinders,
      }).performCalculation();

      setCylinders(_cylinders);
      setDiskRequests(result);
      setAnimate(_animate);

      setReset(true);
      setTimeout(() => {
        setReset(false);
      }, 1); //this works?
    } catch (error) {}
  };

  return (
    <div className="min-h-screen w-full min-w-fit flex flex-col items-center justify-center px-[15vw] py-10 gap-5 bg-neutral-950">
      <Disclaimer />
      <Title />
      <Open setConfigOpen={setConfigOpen} configOpen={configOpen} />
      <Result seekTime={seekTime} />
      <Grid
        diskRequests={diskRequests}
        cylinders={cylinders}
        reset={reset}
        animate={animate}
      />
      <AnimatePresence>
        {configOpen && (
          <Config
            setConfigOpen={setConfigOpen}
            configOpen={configOpen}
            algorithm={_algorithm}
            setAlgorithm={_setAlgorithm}
            direction={_direction}
            setDirection={_setDirection}
            cylinders={_cylinders}
            setCylinders={_setCylinders}
            diskRequests={_diskRequests}
            setDiskRequests={_setDiskRequests}
            animate={_animate}
            setAnimate={_setAnimate}
            handleConfirmConfig={handleConfirmConfig}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Seektime;
