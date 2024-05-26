"use client";
import React, { useEffect, useState } from 'react';
import * as Icons from '../components/SVG'
import toast, { Toaster, resolveValue  } from 'react-hot-toast';

import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'




export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [questTitle, setQuestTitle] = useState("");
  const [questTimeFrom, setQuestTimeFrom] = useState("");
  const [questTimeTo, setQuestTimeTo] = useState("");
  const [today, setToday] = useState({});
  const [tasks, setTasks] = useState([]);
  const [materiaSelect, setMateriaSelect] = useState("Select Materia");
  const [EXP, setEXP] = useState(999)
  useEffect(()=>{
    const now = new Date()
    setToday({
      date: now.getDate(),
      month: now.toLocaleDateString('en-US', {month: 'long'}),
      day: now.toLocaleDateString('en-US', {weekday: 'long'}),
    });

    setTasks([
      {
        title:"Quest 1",
        from: "0600",  
        to: "0800",
        isCompleted: false,
        exp: 100,
        materia:1  
      },
      {
        title:"Quest 2",
        from: "0800",  
        to: "1000",
        isCompleted: false,
        exp: 100,
        materia:0  
      },
      {
        title:"Quest 3",
        from: "1000",  
        to: "1100",
        isCompleted: false,
        exp: 100,
        materia:2  
      },
      {
        title:"Quest 4",
        from: "1100",  
        to: "0100",
        isCompleted: false,
        exp: 100,
        materia:0  
      },
      {
        title:"Quest 5",
        from: "1100",  
        to: "0100",
        isCompleted: true,
        exp: 100,
        materia:0  
      }     
    ])
  }, []);
  const materia = [
    {id:0, name:["Fire","Fira","Firaga"], level:2},
    {id:1, name:["Blizzard", "Blizzara", "Blizzaga"], level:1},
    {id:2, name:["Aero", "Aira", "Airaga"], level:0},
    {id:3, name:["Japanese"], level:0},
  ]
  const getMateriaColor=(level)=>{
    let color="#00effb"
    if(level===1) color="yellow"
    else if(level===2) color="red"
    return color
  }
  const materiaList = materia.map(({id,name,level})=>{
    const Component = Icons[name[0]];
    return (
      <MenuItem key={id} onClick={()=>setMateriaSelect(name[level])}>
        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
          <Component h={14} c={getMateriaColor(level)} className="glowing" />
          <span className="ml-3">{name[level]}</span>
          {/*<kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>*/}
        </button>
      </MenuItem>
    )
  })
  const gainExp = (exp, catalyser, gained) => {
    //catalyser.level
    const gainLoss = gained?1:-1;
    const newExp=(exp * (1*0.1))
    const strGainedLost=gained===true?'gained':'lost' 
    let str = 'You '+ strGainedLost +' '+newExp+'XP'

    const Component = Icons[GetMateriaFromId(catalyser)]


    toast(str,{icon:<Component c={getMateriaColor(materia[catalyser].level)} />})
    setEXP(EXP + (gainLoss*newExp))

  }
  const GetMateriaFromId=(id)=>{
    let materia="Fire";
    switch(id){
      case 0:
        materia="Fire"
        break
      case 1:
        materia="Blizzard"
        break
      case 2:
        materia="Aero"
        break
    }
    return materia
  }
  const onRemove = (itemToRemove) => {
    let prevTask = tasks
    for(let i of prevTask)
      if(i===itemToRemove) i.isCompleted=!i.isCompleted

    setTasks([...prevTask])

    gainExp(itemToRemove.exp, itemToRemove.materia, itemToRemove.isCompleted)
  }
  console.log(tasks)


  return (
    <main className="flex flex-col scrollbar-hide overflow-x-hidden  mainContent h-screen">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        containerClassName=""
        containerStyle={{right:"-20px"}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            borderRadius:"0",
            background: "linear-gradient(90deg, #444 40%, rgba(0,0,0,0) 100%)",
            color: '#fff',
            height:"40px",
            width:"200px",
            fontSize:'0.9rem',
            textAlign:'left',
            right:"0"
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />


      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={()=>setIsOpen(false)}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto" style={{background:"rgba(0,0,0,0.7)"}}>
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="dialogboxStyle flex flex-col w-full max-w-md bg-white/5 py-3 px-6" style={{
                  borderRadius:0,
                  background:"linear-gradient(180deg, rgba(51,146,204,1) -15%, rgba(0,42,90,1) 25% 50%, rgba(0,20,41,1) 100%)"
                }}>
                  <DialogTitle as="h3" className="text-lg  font-medium text-[#01b2e4] text-center">
                    <span className="drop-shadow-xl">New Quest</span>
                  </DialogTitle>
                  <div className="mt-2 text-sm/6 text-white mt-3">
                    <table className="w-full">
                    <tbody>
                      <tr>
                        <th className="w-1/2 text-right pr-2 text-[#00effb] font-normal">Quest Title</th>
                        <td className="w-1/2 pl-2"><input type="text" value={questTitle} onChange={(v)=>setQuestTitle(v.target.value)} className="hover:outline-none text-center bg-transparent inputText"/></td>
                      </tr>
                      <tr>
                        <th className="w-1/2 text-right pr-2 text-[#00effb] font-normal">Quest Time</th>
                        <td className="w-full flex flex-row pl-2">
                          <input type="text" value={questTimeFrom} onChange={(v)=>setQuestTimeFrom(v.target.value)} className="w-16 outline-none hover:outline-none text-center bg-transparent inputText"/>
                          <h5>to</h5>
                          <input type="text" value={questTimeTo} onChange={(v)=>setQuestTimeTo(v.target.value)} className="w-16 outline-none hover:outline-none text-center bg-transparent inputText"/>
                        </td>
                      </tr>
                      <tr>
                        <th className="w-1/2 text-right pr-2 text-[#00effb] font-normal">Catalyser Materia</th>
                        <td className="w-40 flex items-center justify-center flex-row pl-2 h-16">
                          <Menu>
                            <MenuButton className="flex items-center gap-2 w-full py-1.5 px-3 text-sm text-white text-center focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white" style={{background:"linear-gradient(90deg, rgba(51,146,204,0) -5%, #01040d 50%, rgba(0,15,36,0) 105%)"}}>
                              <div className="w-5/6">{materiaSelect}</div>
                              <div className="w-1/6">v</div>
                            </MenuButton>
                            <Transition
                              enter="transition ease-out duration-75"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <MenuItems
                                anchor="bottom end"
                                className="w-52 z-50 origin-top-right border border-white/5 p-1 text-sm text-white [--anchor-gap:var(--spacing-1)] focus:outline-none bg-black" style={{borderRadius:0,zIndex:100,backgroundColor:"rgba(0,0,0,0.8)"}}
                              >
                              { 
                                materiaList
                              }
                              </MenuItems>
                            </Transition>
                          </Menu>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex flex-col gap-2 justify-center">
                    <Button
                      className="dialogButtonActive flex items-center justify-center gap-2 bg-gray-700 py-1 px-3 text-sm text-white focus:outline-none w-full text-center"
                      style={{background:"linear-gradient(90deg, rgba(51,146,204,0) 10%, rgba(3,142,252,1) 50%, rgba(0,15,36,0) 90%)"}}
                      onClick={()=>setIsOpen(false)}
                    >
                      Create
                    </Button>

                    <Button
                      className="dialogButtonNegative flex items-center justify-center gap-2 bg-gray-700 py-1 px-3 text-sm text-white focus:outline-none w-full text-center"
                      style={{background:"linear-gradient(90deg, rgba(51,146,204,0) 10%, #01040d 50%, rgba(0,15,36,0) 90%)"}}
                      onClick={()=>setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>


      <div style={{backgroundColor:"#133C57"}} className="flex justify-center  w-full p-0 mt-0 ml-0">
        <h1 className="text-xl drop-shadow-lg">Jikanto</h1>
      </div>
      <div className="w-full justify-center flex">
        <div className="w-11/12 mt-5 text-white flex flex-col">
          <div className="flex flex-row">
            <div className="flex w-2/4">
              <div className="w-full text-center dateText flex flex-col">
                <h1 className="text-6xl drop-shadow-sm">{today.date}</h1>
                <div className="w-full flex flex-row">
                  <div className="w-full">{today.day}</div>
                  <div className="w-full">{today.month}</div>
                </div>
              </div>
              
            </div>
            <div className="flex flex-col text-right w-2/4">
              <div className="text-xs flex justify-end flex-col">
                {/*<div className="flex items-center p-0 drop-shadow-lg justify-end">
                  <BronzeIII h={48} c="#fff"/>
                </div>*/}
              </div>
                <div className="flex mt-1 flex-col">
                  <h3 className="text-lg">Bronze I</h3>
                  <h3 className="text-lg">{EXP}XP</h3>
                </div>
              {/*<div onClick={()=>toast('You gained 400XP',{icon:<Fire c="#fff" />})}>
                350XP
              </div>*/}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-1 overflow-y-auto overflow-x-hidden" style={{height:"360px"}}>
            {
              tasks.length>0?tasks.map((i,j)=>(
                
                  <div key={j} className={`flex px-2 py-2 flex-row ${j%2!==0?"bg-[#05224b]":""} ${i.isCompleted&&"select-none"}`} style={{"height":"60px", transition: "all 0.5s ease", filter: i.isCompleted ? "grayscale(80%)" : "grayscale(0%)", background: i.isCompleted && "rgba(26,31,40,0.7)"}}>
                      <div className="w-2/5 flex flex-row overflow-x-hidden">
                        <div className="">{i.from} - {i.to}</div>
                      </div>
                      <div className="w-3/5">
                        <h2 className="text-[#00effb] truncate">{i.title}</h2>
                        <div className="text-sm text-right flex justify-between gap-3">
                          <div className="text-xs">
                            {i.isCompleted&&
                              <span style={{transition: "all 0.5s ease", opacity: i.isCompleted ? "1" : "0"}}>Quest Completed</span>
                            }
                          </div>
                          <div className="flex flex-row w-1/4 justify-between">
                            <Icons.Delete />
                            <Icons.Edit />
                            <Icons.Tick onClick={() => onRemove(i)} />
                          </div>
                        </div>
                      </div>
                    </div>
                ))  :   
              <div className="flex flex-col justify-center items-center h-1/2">
                <h1 className="text-2xl">No Tasks</h1>
                <div className="text-sm mt-2 flex flex-row gap-2">
                  <div>Tap </div><div className="w-5 flex items-center justify-center border text-center h-5 bg-black">+</div><div> to Add a New Task</div>
                </div>
              </div>
            }
          </div>
          <div className="mt-5 flex flex-row foot pt-4  pl-4" style={{height:"150px"}}>
            <div className="w-10/12 flex flex-col">
              <div>
                <div className="flex gap-3">
                  <h3>Flags</h3>
                  <div className="flex items-center -mt-1"><Icons.Edit h={14} c="#fff"/></div>
                </div>
                <div className="flex flex-row gap-3 ml-3">
                  <div className="flex flex-row gap-1">
                    
                  </div>
                  <Icons.Add/>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex gap-3">
                  <h3 onClick={()=>toast('Saving Data...', {
                    duration: 4000,
                    position: 'top-left',

                    // Styling
                    style: {
                      textAlign:'left',
                      marginLeft:'-10px',
                      width:"150px",
                      background: "linear-gradient(to left, #00acc9 90%, rgba(255,0,0,0))",
                    },
                    className: '',
                    icon: <Icons.Hourglass c="#fff" />,

                    // Change colors of success/error/loading icon
                    iconTheme: {
                      primary: '#000',
                      secondary: '#fff',
                    },

                    // Aria
                    ariaProps: {
                      role: 'status',
                      'aria-live': 'polite',
                    },
                  })}>Badges</h3>
                  <div className="flex items-center -mt-1"><Icons.Edit h={14} c="#fff"/></div>
                </div>
                <div className="flex flex-row gap-3 ml-3 mt-2">
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Coin h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Shine h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Fire h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Blizzard h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Aero h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Hourglass h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Dumbbell h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Book h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Meditation h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Water h={16}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.Japanese h={16}/></div>
                  <Icons.Add/>
                </div>
                <div className="flex flex-row gap-3 ml-3 mt-2">
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.BronzeI h={20}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.BronzeII h={20}/></div>
                  <div className="flex items-center drop-shadow-lg -mt-1"><Icons.BronzeIII h={20}/></div>
                </div>
              </div>
            </div>
            <div className="fixed right-5 w-2/12 flex justify-end content-end items-end">
              <div className="flex text-xl drop-shadow-lg cursor-pointer justify-center items-center bg-[#081829] w-10 h-10"

                 onClick={() => {
                  console.log("DDDDDDDD")
                  setIsOpen(true);
                }}
                
              >+</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
