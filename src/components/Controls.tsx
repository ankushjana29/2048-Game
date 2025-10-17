type Props = {
    onMove: (dir: "left" | "right" | "up" | "down") => void;
    onRestart: () => void;
};

// This uses a NAMED EXPORT: 'export const Controls'
export const Controls = ({ onMove, onRestart }: Props) => {
    // We use w-20 (width: 5rem) to make the buttons uniform in size.
    const uniformButtonClasses = "control-button directional-button w-20"; 

    return (
        // *** CRITICAL ALIGNMENT FIX APPLIED: Added mx-auto ***
        // This makes the component center itself within the App's layout.
        <div className="mt-4 flex flex-col items-center p-4 w-full max-w-lg mx-auto">
            
            {/* --- Directional Button Group (Container for 3x1 layout) --- */}
            <div className="flex flex-col items-center gap-4">
                
                {/* Row 1: Up Button (Centered) */}
                <div>
                    <button 
                        onClick={() => onMove("up")} 
                        className={uniformButtonClasses}
                        aria-label="Move Up"
                    >
                        Up
                    </button>
                </div>

                {/* Row 2: Left, Down, Right Buttons (Centered horizontally) */}
                <div className="flex gap-2">
                    <button 
                        onClick={() => onMove("left")} 
                        className={uniformButtonClasses}
                        aria-label="Move Left"
                    >
                        Left
                    </button>
                    <button 
                        onClick={() => onMove("down")} 
                        className={uniformButtonClasses}
                        aria-label="Move Down"
                    >
                        Down
                    </button>
                    <button 
                        onClick={() => onMove("right")} 
                        className={uniformButtonClasses}
                        aria-label="Move Right"
                    >
                        Right
                    </button>
                </div>
            </div>
            {/* --- End Directional Button Group --- */}
            
            {/* Restart Button (Distinct Red/Orange Styling) */}
            <button 
                onClick={onRestart} 
                className="mt-8 w-2/3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-3 rounded-xl shadow-lg transition-all duration-150 transform hover:scale-[1.02] uppercase tracking-wider"
            >
                Restart Game
            </button>
        </div>
    );
}