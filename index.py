import eel
import numpy as np
import copy

eel.init('')

@eel.expose
def initiaise(attributeNumber):
    # attribute number
    R = attributeNumber
    # maximal set array
    maxSet = [[] for i in range(R)]
    # an array to store functional dependencies
    FDs = []
    for i in range(attributeNumber):
        temp = np.array([i1 for i1 in range(attributeNumber)])
        temp = np.delete(temp, i)
        maxSet[i].append(temp.tolist())
        FDs.append([])
    return {'R': R, 'maxSet': maxSet, 'FDs': FDs}


def delete(array, index):
    return array[0:index] + array[(index + 1):]


def union(array1, array2):
    return list(np.unique(array1 + array2))


def intersection(array1, array2):
    return [i for i in array1 if i in array2]


def minus(Y, X):
    res = []
    for i in Y:
        if i not in X:
            res.append(i)
    return res


def getClosureSet(FDs, X):
    if X != []:
        Xnew = X
        while True:
            Xold = Xnew
            for V in range(len(FDs)):
                for U in FDs[V]:
                    if U != []:
                        check = 1
                        for e in U:
                            if e not in Xnew:
                                check = 0
                        if check == 1:
                            Xnew = union(Xnew, [V])
            if Xnew == Xold:
                break
    else:
        Xnew = [[]]
        for V in range(len(FDs)):
            for U in FDs[V]:
                if U == []:
                    Xnew.append(V)
    return Xnew


def maxCheck(FDs, R, A, X):
    if A not in getClosureSet(FDs, X):
        for B in minus([i for i in range(R)], X):
            if A in getClosureSet(FDs, union(X, [B])):
                return True
    return False


def contain(Y, FDs):
    newFDs = []
    for fds in FDs:
        status = 1
        for y in Y:
            if y not in fds:
                status = 0
                continue
        if status == 0:
            newFDs.append(fds)
    newFDs.append(Y)
    return newFDs

def updateMaxSet(R, maxSet, FDs, attributeIndex, Y):
    newmaxSet = [[] for i in range(R)]
    FDs[attributeIndex] = contain(Y, FDs[attributeIndex])
    # A is the index of attribute
    for A in range(R):
        newmaxSet[A] = maxSet[A]
        # W is the index of fd of A
        for W in range(len(maxSet[A])):
            if not (maxCheck(FDs, R, A, maxSet[A][W])):
                newmaxSet[A] = delete(newmaxSet[A], W)
                for B in Y:
                    for Z in maxSet[B]:
                        if maxCheck(FDs, R, A, intersection(maxSet[A][W], Z)):
                            newmaxSet[A].append(intersection(maxSet[A][W], Z))
                            temp = []
                            for i in newmaxSet[A]:
                                if i not in temp:
                                    temp.append(i)
                            newmaxSet[A] = temp
    return newmaxSet, FDs

@eel.expose
def updateMax(R, maxSet, FDs, attributeIndex, Y):
    oldmaxSet, FDs = updateMaxSet(R, maxSet, FDs, attributeIndex, Y)
    newmaxSet, FDs = updateMaxSet(R, oldmaxSet, FDs, attributeIndex, Y)
    while oldmaxSet != newmaxSet:
        oldmaxSet, FDs = updateMaxSet(R, oldmaxSet, FDs, attributeIndex, Y)
        newmaxSet, FDs = updateMaxSet(R, oldmaxSet, FDs, attributeIndex, Y)
    return {'maxSet': newmaxSet, 'FDs': FDs}

def RMEXA(FDs, NRFDX, toDeleteIndex):
    for xI in range(len(NRFDX[-1])):
        xC = getClosureSet(FDs, [NRFDX[-1][xI]])
        tempNRFDX = NRFDX[-1][0:xI] + NRFDX[-1][(xI + 1):]
        for tempxI in range(len(tempNRFDX)):
            if tempNRFDX[tempxI] in xC:
                if tempxI >= xI:
                    toDeleteIndex.append(tempxI + 1)
                else:
                    toDeleteIndex.append(tempxI)
        if len(toDeleteIndex) > 0:
            return toDeleteIndex
    return -1


def RMRDFD(FDs, NRFDs, status):
    for fdsI in range(len(NRFDs)):
        for XI in range(len(NRFDs[fdsI])):
            if FDs[fdsI][XI] != []:
                tempNRFDs = copy.deepcopy(NRFDs)
                del tempNRFDs[fdsI][XI]
                if fdsI in getClosureSet(tempNRFDs, NRFDs[fdsI][XI]):
                    NRFDs = copy.deepcopy(tempNRFDs)
                    return NRFDs, status
    status = 1
    return NRFDs, status

@eel.expose
def showNonRedundantFDs(FDs):
    NRFDX = []
    NRFDY = []
    for fdsI in range(len(FDs)):
        for X in FDs[fdsI]:
            NRFDX.append(X)
            NRFDY.append(fdsI)
            if len(X) > 1:
                toDeleteIndex = []
                resRMEXA = RMEXA(FDs, NRFDX, toDeleteIndex)
                while resRMEXA != -1:
                    for i in sorted(resRMEXA, reverse=True):
                        del NRFDX[-1][i]
                    toDeleteIndex = []
                    resRMEXA = RMEXA(FDs, NRFDX, toDeleteIndex)
    NRFDs = [[] for i in range(len(FDs))]
    for i in range(len(NRFDY)):
        NRFDs[NRFDY[i]].append(NRFDX[i])

    status = 0
    while status == 0:
        NRFDs, status = RMRDFD(FDs, NRFDs, status)

    existingX = []
    for fdsI in range(len(NRFDs)):
        for XI in range(len(NRFDs[fdsI])):
            if NRFDs[fdsI][XI] not in existingX:
                existingX.append(NRFDs[fdsI][XI])
    finalFDs = []
    for ex in existingX:
        finalFDs.append(ex)
        tempFinalFDY = []
        for fdsI in range(len(NRFDs)):
            for XI in range(len(NRFDs[fdsI])):
                if NRFDs[fdsI][XI] == ex:
                    tempFinalFDY.append(fdsI)
                    continue
        finalFDs.append(tempFinalFDY)

    return {'finalFDs': finalFDs}

eel.start('index.html')