import * as fs from "fs";

export function block(){
    fs.readFile('./world_data.json', 'utf8', (err, jsonString) => {
      if (err) {
          console.log("Error reading file from disk:", err)
          return
      }
      try {
          const data = JSON.parse(jsonString)
          console.log("Facing", data.facing)
  } catch(err) {
          console.log('Error parsing JSON string:', err)
      }
  })
  }