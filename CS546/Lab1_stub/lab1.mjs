export const questionOne = (index) => {
  if (index <= 1) { return index }

  return (questionOne(index-1) + questionOne(index-2))
}

export const questionTwo = (arr) => {

  let obj = {}

  let isPrime = (num) => {
    if (num <= 1) return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false
    }
    return true
  }

  arr.forEach(num => {

    obj[num] = isPrime(num)
    
  })
  return obj

}

export const questionThree = (str) => {
  let obj = {'constanants': 0, 'vowels': 0, 'numbers': 0, 'spaces': 0, 'punctuation': 0, 'specialCharacters' : 0}
  let vow = new Set(['a','e','i','o','u'])
  let punc = new Set(['.', ',', '?', '!', ':', '', "'", '"', '(', ')', '[', ']', '{', '}', '-', '_'])
  let num = new Set([1,2,3,4,5,6,7,8,9,0])
  let con = new Set('bcdfghjklmnpqrstvwxyz'.split(''))
  let spec = new Set(['@', '#', '$', '%', '^', '&', '*', '/', '\\', '=', '<', '>', '|'])


  for (let letter of str) {
    if(con.has(letter.toLowerCase())){
      obj['constanants'] += 1
    }
    else if(vow.has(letter.toLowerCase())){
      obj['vowels'] += 1
    }
    else if(num.has(letter.toLowerCase())){
      obj['numbers'] += 1
    }
    else if(letter === ' '){
      obj['spaces'] += 1
    }
    else if(punc.has(letter)){
      obj['punctuation'] += 1
    }
    else if(spec.has(letter)){
      obj['specialCharacters'] += 1
    }
  }

  return obj
}

export const questionFour = (arr) => {
  let uniqSet = new Set()
  for (let val of arr){
    if (uniqSet.has(val)){ continue}
    uniqSet.add(val)
  }
  return [...uniqSet] //return result
}


//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Jay',
  lastName: 'Patel',
  studentId: '20019207'
}
