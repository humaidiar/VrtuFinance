import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculatorFormSchema, insertLeadSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Calculator API endpoint for performing Diminishing Musharaka calculations
  app.post("/api/calculate", async (req, res) => {
    try {
      // Validate the input data
      const formData = calculatorFormSchema.parse(req.body);
      
      // Perform the calculation
      const result = calculateDiminishingMusharaka(formData);
      
      // Return the calculation results
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      } else {
        console.error("Calculation error:", error);
        res.status(500).json({ message: "Error performing calculation" });
      }
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the lead data
      const leadData = insertLeadSchema.parse(req.body);
      
      // Store the lead in our storage
      await storage.createLead(leadData);
      
      // Return success
      res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({ message: "Error submitting contact form" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Function to calculate Diminishing Musharaka financing
function calculateDiminishingMusharaka(formData: z.infer<typeof calculatorFormSchema>) {
  const {
    propertyPrice,
    depositAmount,
    term,
    appreciationRate = 3
  } = formData;

  // Calculate initial ownership percentage
  const initialOwnershipPercentage = (depositAmount / propertyPrice) * 100;
  
  // Calculate financed amount (Vrtu's share)
  const financedAmount = propertyPrice - depositAmount;
  
  // Add markup to Vrtu's share (30% markup is standard for this example)
  const markup = 1.3; // 30% markup
  const vrtuShareWithMarkup = financedAmount * markup;
  
  // Calculate monthly acquisition payment (to purchase Vrtu's share)
  const monthlyAcquisition = vrtuShareWithMarkup / (term * 12);
  
  // Annual rental rate (percentage of remaining Vrtu share)
  const annualRentalRate = 0.04; // 4%
  
  // Generate yearly breakdown data
  const yearlyBreakdown = [];
  let customerOwnership = initialOwnershipPercentage / 100;
  let remainingProviderShare = vrtuShareWithMarkup;
  let totalRentPaid = 0;
  let totalSharesPurchased = 0;
  let fullOwnershipYears = term;
  
  for (let year = 0; year <= term; year++) {
    // Calculate rent based on remaining provider share and customer ownership
    const yearlyRental = (remainingProviderShare * annualRentalRate) * (1 - customerOwnership);
    const weeklyRental = yearlyRental / 52;
    
    // Acquisition payment is fixed
    const yearlyAcquisition = monthlyAcquisition * 12;
    const weeklyAcquisition = yearlyAcquisition / 52;
    
    // Total weekly payment
    const weeklyPayment = weeklyRental + weeklyAcquisition;
    
    yearlyBreakdown.push({
      year,
      customerOwnershipPercentage: customerOwnership * 100,
      weeklyPayment,
      rentComponent: weeklyRental,
      shareComponent: weeklyAcquisition,
      remainingProviderShare,
    });
    
    // Update totals
    totalRentPaid += yearlyRental;
    totalSharesPurchased += yearlyAcquisition;
    
    // Update provider share and customer ownership for next year
    remainingProviderShare -= yearlyAcquisition;
    
    // If no more provider share, we've reached full ownership
    if (remainingProviderShare <= 0) {
      remainingProviderShare = 0;
      customerOwnership = 1;
      if (fullOwnershipYears === term) {
        fullOwnershipYears = year;
      }
    } else {
      // Otherwise, recalculate ownership percentage
      customerOwnership = 1 - (remainingProviderShare / vrtuShareWithMarkup);
    }
  }
  
  // Calculate monthly payment (total of both components)
  const monthlyPayment = (monthlyAcquisition + 
    ((vrtuShareWithMarkup * annualRentalRate) * (1 - (initialOwnershipPercentage / 100)) / 12));
  
  return {
    monthlyPayment,
    initialOwnershipPercentage,
    fullOwnershipYears,
    totalRentPaid,
    totalSharesPurchased,
    yearlyBreakdown,
  };
}
