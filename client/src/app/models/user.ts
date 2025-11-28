// Type representing a user in the system
export type User = {
  email: string;   // User's email address
  role: string[];  // Array of roles assigned to the user (e.g., ["Admin", "Customer"])
}

// Type representing a physical address
export type Address = {
  name: string;           // Name of the recipient
  line1: string;          // Address line 1
  line2?: string | null;  // Optional address line 2
  city: string;           // City
  state: string;          // State or province
  postal_code: string;    // ZIP or postal code
  country: string;        // Country
}
