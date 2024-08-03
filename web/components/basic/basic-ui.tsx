'use client';


export function BasicCreate() {

  return (
    <button
      className="btn btn-xs lg:btn-md btn-primary"
     
    >
      Run program
    </button>
  );
}

export function BasicProgram() {
 
    return (
      <div className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }

