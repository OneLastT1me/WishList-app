

type  ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size: "default" | "sm"| "lg" 
    variant?: "default" | "destructive" | "outline" | "secondary" ;
}
const baseStyles =
  "rounded-md font-medium transition active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles = {
        default: "bg-black text-white hover:bg-black/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-white text-black border border-gray-300 hover:bg-gray-100",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

};

const sizeStyles = {
    default: "h-10 px-6 rounded-xl text-base font-semibold",
    sm: "h-8 px-1.5 min-w-8",
    lg: "h-10 px-2.5 min-w-10",
};

const MainButton = ({children, size= 'default' , variant = "default", className, ...props}: ButtonProps) => {
    return (
    <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
        >
        {children}
    </button>
    )
}

export default MainButton